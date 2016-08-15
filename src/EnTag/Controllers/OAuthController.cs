using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EnTag.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Routing;
using Tweetinvi;
using Tweetinvi.Models;
using System.Text;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace EnTag.Controllers
{
    [Route("[controller]")]
    public class OAuthController : Controller
    {
        private TwitterAuthService _twitter;
        private SpotifyAuthService _spotify;
        private TwitchAuthService _twitch;
        public OAuthController(TwitterAuthService t,SpotifyAuthService s, TwitchAuthService tw)
        {
            _twitter = t;
            _spotify = s;
            _twitch = tw;
        }

        private IAuthenticationContext _authContext;

        [HttpGet("twitter")]
        public ActionResult Twitter()
        {
            var redirectUrl = "http://" + Request.Host.Value + "/oauth/twitter/auth";

            _authContext = _twitter.TwitterAuth(redirectUrl);
            
            return new RedirectResult(_authContext.AuthorizationURL);
        }

        [HttpGet("twitter/auth", Name = "TwitterAuth")]
        public ActionResult TwitterAuth([FromQuery]string oauth_verifier,[FromQuery] string oauth_token,[FromQuery] string authorization_id)
        {
            

            var test = _twitter.ValidateTwitterAuth(oauth_verifier, authorization_id);

            _twitter.AddItIn(test.AccessToken, test.AccessTokenSecret, "Twitter", User.Identity.Name);
            return Ok();
        }

        [HttpGet("twitch")]
        public ActionResult Twitch()
        {
            var redirectUrl = "http://" + Request.Host.Value + "/oauth/twitch/auth";
            var id = "s3n11pgqzcy09gqlz7gdgjloc3vzfav";
            var scopes = "user_read%20user_subscriptions";
            var loginUrl = "https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=" + id + "&redirect_uri=" + redirectUrl + "&scope=" + scopes;

            return Redirect(loginUrl);
        }

        [HttpGet("twitch/auth", Name = "TwitchAuth")]
        public ActionResult TwitchAuth([FromQuery]string code)
        {
            var qatch = _twitch.AuthTwitch(code, "http://" + Request.Host.Value + "/oauth/twitch/auth");
            dynamic test = JObject.Parse(qatch);
            _twitch.AddItIn((string)test.access_token, "", "Twitch", User.Identity.Name);
            return Ok();
        }

    }
}

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

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace EnTag.Controllers
{
    [Route("[controller]")]
    public class OAuthController : Controller
    {
        private TwitterAuthService _twitter;
        private SpotifyAuthService _spotify;
        public OAuthController(TwitterAuthService t,SpotifyAuthService s)
        {
            _twitter = t;
            _spotify = s;
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


       

    }
}

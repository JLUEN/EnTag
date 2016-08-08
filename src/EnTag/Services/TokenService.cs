using EnTag.Infrastructure;
using EnTag.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Networking;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Credentials.Models;
using Tweetinvi.Models;


namespace EnTag.Services
{
    public class TokenService
    {
        private TokenRepository _tRepo;
        private IHttpContextAccessor _context;
        public TokenService(TokenRepository tr, IHttpContextAccessor context)
        {
            _tRepo = tr;
            _context = context;
        }

        public TokenDTO GetTwitterCreds(string username)
        {
            return (from t in _tRepo.GetCreds(username)
                    where t.Service == "Twitter"
                    select new TokenDTO()
                    {
                        Token = t.Token,
                        Secret = t.Secret
                    }).FirstOrDefault();
        }

        public IEnumerable<ITweet> GetHomeTest(string username)
        {
            var test = this.GetTwitterCreds(username);
            Auth.SetUserCredentials("pH8Qoql342mGPXHNY0Wnk3LZX", "kzIFhr3VaTW9yZJFh4WVvltFA45RXPjMD8IvxkcA2xvbwG5Lsk", test.Token, test.Secret);
           
            var tweets = Timeline.GetHomeTimeline();

            return tweets;
        }

        public void PostTweetTest(string myTweet) {

            var firstTweet = Tweet.PublishTweet(myTweet);
        }
        


    }
}

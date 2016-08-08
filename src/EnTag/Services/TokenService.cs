using EnTag.Infrastructure;
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

        public IEnumerable<ITweet> GetHomeTest()
        {
            Auth.SetUserCredentials("pH8Qoql342mGPXHNY0Wnk3LZX", "kzIFhr3VaTW9yZJFh4WVvltFA45RXPjMD8IvxkcA2xvbwG5Lsk", "760880036287098881-24I1rTTAP5r5ldJjV9awcNBlEKyRN5p", "DLz1oKCA7jPufwjS36osEBfaJtWZGaIdHo8lfJPDYi2iP");
           
            var tweets = Timeline.GetHomeTimeline();

            return tweets;
        }

        public void PostTweetTest(string myTweet) {

            var firstTweet = Tweet.PublishTweet(myTweet);
        }
        


    }
}

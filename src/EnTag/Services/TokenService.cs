using EnTag.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Models;

namespace EnTag.Services
{
    public class TokenService
    {
        private TokenRepository _tRepo;
        public TokenService(TokenRepository tr)
        {
            _tRepo = tr;
        }

        public IEnumerable<ITweet> GetHomeTest()
        {
            Auth.SetUserCredentials("pH8Qoql342mGPXHNY0Wnk3LZX", "kzIFhr3VaTW9yZJFh4WVvltFA45RXPjMD8IvxkcA2xvbwG5Lsk", "760880036287098881-24I1rTTAP5r5ldJjV9awcNBlEKyRN5p", "DLz1oKCA7jPufwjS36osEBfaJtWZGaIdHo8lfJPDYi2iP");

            var tweets = Timeline.GetHomeTimeline();

            return tweets;
        }


        }
}

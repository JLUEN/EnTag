﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Tweetinvi.Models;
using Tweetinvi;
using EnTag.Services;
using EnTag.Services.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace EnTag.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private TokenService _tokenService;
        public TestController(TokenService ts) {
            _tokenService = ts;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<ITweet> GetHomeTest()
        {
            return _tokenService.GetHomeTest(User.Identity.Name);
        }

        [HttpGet("youtube/username")]
        public TokenDTO GetYouTubeUsername() {

            return _tokenService.GetYouTubeUsername(User.Identity.Name);
        } 



        [HttpPost]
        public IActionResult PostTweetTest([FromBody]string myTweet)
        {

            _tokenService.PostTweetTest(myTweet);

            return Ok();
        }

        [HttpPost("youtube/username")]
        public IActionResult PostYoutubeUsername([FromBody] string username) {

            _tokenService.PostYoutubeUsername(User.Identity.Name, username);

            return Ok();
        }


    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace EnTag.Controllers
{
    [Route("api/[controller]")]
    public class TwitchController : Controller
    {
        //GET /api/twitch/follows/username
        [HttpGet("follows/{username}")]
        public string GetFollows(string username)
        {
            //ASCIIEncoding encoding = new ASCIIEncoding();
            //string postData = "/users/" + username;
            //postData += "/follows/channels";
            //byte[] data = encoding.GetBytes(postData);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(new Uri("https://api.twitch.tv/kraken/users/" + username + "/follows/channels"));
            request.Method = "GET";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader stremRead = new StreamReader(response.GetResponseStream());
            string result = stremRead.ReadToEnd();

            return result;
        }

        [HttpGet("username")]
        public string GetName()
        {
            var id = "96riuizggy28rf8zurnaxrwv6ai6cf";

            //ASCIIEncoding encoding = new ASCIIEncoding();
            //string postData = "oauth_token=" + id;
            //byte[] data = encoding.GetBytes(postData);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(new Uri("https://api.twitch.tv/kraken?oauth_token=" + id));
            request.Method = "GET";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader stremRead = new StreamReader(response.GetResponseStream());
            string result = stremRead.ReadToEnd();

            dynamic qatch = JObject.Parse(result);

            return qatch.token.user_name;
        }
    }
}

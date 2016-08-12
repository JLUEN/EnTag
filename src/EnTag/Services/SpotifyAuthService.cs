using EnTag.Infrastructure;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnTag.Services
{
    public class SpotifyAuthService
    {
        private IHttpContextAccessor _context;
        private TokenRepository _tRepo;
        public SpotifyAuthService(IHttpContextAccessor context, TokenRepository tr)
        {
            _context = context;
            _tRepo = tr;
        }

       

    }
}

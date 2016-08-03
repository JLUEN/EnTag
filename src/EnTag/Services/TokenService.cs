using EnTag.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnTag.Services
{
    public class TokenService
    {
        private TokenRepository _tRepo;
        public TokenService(TokenRepository tr)
        {
            _tRepo = tr;
        }
    }
}

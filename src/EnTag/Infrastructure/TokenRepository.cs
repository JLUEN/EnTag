using EnTag.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnTag.Infrastructure
{
    public class TokenRepository
    {
        private ApplicationDbContext _db;
        public TokenRepository(ApplicationDbContext db)
        {
            _db = db;
        }
    }
}

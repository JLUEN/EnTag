using EnTag.Data;
using EnTag.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnTag.Infrastructure
{
    public class TokenRepository
    {
        private ApplicationDbContext _db;
        private UserRepository _uRepo;
        public TokenRepository(ApplicationDbContext db, UserRepository ur)
        {
            _db = db;
            _uRepo = ur;
        }

        public IQueryable<ExternalToken> GetCreds(string username)
        {
            return from t in _db.ExternalTokens
                   where t.UserId == _uRepo.GetUserId(username)
                   select t;
        }

        public void AddItIn(string token, string secret, string service, string username)
        {
            var userTokens = new ExternalToken()
            {
                Token = token,
                Secret = secret,
                Service = service,
                UserId = _uRepo.GetUserId(username)
            };

            var check = (from t in _db.ExternalTokens
                         where t.UserId == _uRepo.GetUserId(username)
                         select t.UserId).FirstOrDefault();

            if (userTokens.UserId == check)
                return;

            _db.ExternalTokens.Add(userTokens);
            _db.SaveChanges();
        }
    }
}

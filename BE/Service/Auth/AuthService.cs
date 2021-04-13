using AutoMapper;
using Common;
using Common.Constants;
using Common.Http;
using Common.MD5;
using Data;
using Domain.DTOs;
using Domain.DTOs.User;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.Auth
{
    public class AuthService : IAuthService
    {
        private IRepository<Domain.Entities.User> _repository;
        private IMapper _mapper; // Remove unused code
        private IJwtManager _jwtManager;

        public AuthService(IMapper mapper, IJwtManager jwtManager, IRepository<Domain.Entities.User> repository)
        {
            _mapper = mapper;
            _jwtManager = jwtManager;
            _repository = repository;
        }
        public ReturnMessage<string> CheckLogin(UserLoginDTO data)
        {
            if (data.Username.IsNullOrEmpty() || data.Password.IsNullOrEmpty())
            {
                return new ReturnMessage<string>(true, null, MessageConstants.InvalidAuthInfoMsg);
            }

            try
            {
                var account = _repository.Queryable().Where(a => a.Username == data.Username && a.Password == MD5Helper.ToMD5Hash(data.Password)).FirstOrDefault();
                if (account.IsNullOrEmpty())
                {
                    return new ReturnMessage<string>(true, null, MessageConstants.InvalidAuthInfoMsg);
                }

                var claims = new Claim[]
                {
                    new Claim(ClaimTypes.UserData, account.Username),
                    new Claim(ClaimTypes.NameIdentifier,account.Id.ToString()),
                };

                // Generate JWT token
                var token = _jwtManager.GenerateToken(claims, DateTime.UtcNow);
                return new ReturnMessage<string>(false, token, MessageConstants.LoginSuccess);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<string>(true, null, ex.Message);
            }
        }
    }
}

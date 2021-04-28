using AutoMapper;
using Common.Constants;
using Common.Enums;
using Common.Http;
using Common.MD5;
using Domain.DTOs.Customer;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.AuthCustomer
{
    public class AuthCustomerService : IAuthCustomerService
    {
        private readonly IRepository<Domain.Entities.User> _repository;
        private readonly IAuthCustomerManager _authCustomerManager;
        private readonly IMapper _mapper;

        public AuthCustomerService(IRepository<User> repository, IMapper mapper, IAuthCustomerManager authCustomerManager)
        {
            _repository = repository;
            _mapper = mapper;
            _authCustomerManager = authCustomerManager;
        }

        public ReturnMessage<CustomerDataReturnDTO> CheckLogin(CustomerLoginDTO data)
        {
            if (data.Username.IsNullOrEmpty() || data.Password.IsNullOrEmpty())
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.InvalidAuthInfoMsg);
            }

            try
            {
                var account = _repository.Queryable().Where(a => a.Type == UserType.Customer && a.Username == data.Username && a.Password == MD5Helper.ToMD5Hash(data.Password)).FirstOrDefault();
                if (account.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.InvalidAuthInfoMsg);
                }

                var claims = new Claim[]
                {
                    new Claim(ClaimTypes.UserData, account.Username),
                    new Claim(ClaimTypes.NameIdentifier,account.Id.ToString()),
                };

                // Generate JWT token
                var token = _authCustomerManager.GenerateToken(claims, DateTime.UtcNow);
                var result = _mapper.Map<Domain.Entities.User, CustomerDataReturnDTO>(account);
                result.Token = token;
                return new ReturnMessage<CustomerDataReturnDTO>(false, result, MessageConstants.LoginSuccess);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, ex.Message);
            }
        }

        public CustomerDecompileDTO GetInformationToken(IEnumerable<Claim> claims)
        {
            var data = new CustomerDecompileDTO()
            {
                Id = Guid.Parse(claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value),
                Username = claims.First(claim => claim.Type == ClaimTypes.UserData).Value,
            };
            return data;
        }
    }
}

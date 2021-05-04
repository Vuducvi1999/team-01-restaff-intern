using AutoMapper;
using Common.Constants;
using Common.Enums;
using Common.Http;
using Common.MD5;
using Domain.DTOs.Customer;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Service.Auth;
using Service.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.AuthCustomer
{
    public class AuthCustomerUserService : IAuthCustomerUserService
    {
        private readonly IRepository<Domain.Entities.User> _userRepository;
        private readonly IRepository<Customer> _customerRepository;

        private readonly IAuthCustomerUserManager _authCustomerManager;
        private readonly IMapper _mapper;
        private readonly ICustomerService _customerService;

        public AuthCustomerUserService(IRepository<User> repository, IMapper mapper, IAuthCustomerUserManager authCustomerManager, ICustomerService customerService, IRepository<Customer> customerRepository)
        {
            _userRepository = repository;
            _mapper = mapper;
            _authCustomerManager = authCustomerManager;
            _customerService = customerService;
            _customerRepository = customerRepository;
        }

        public ReturnMessage<CustomerDataReturnDTO> CheckLogin(CustomerLoginDTO data)
        {
            if (data.Username.IsNullOrEmpty() || data.Password.IsNullOrEmpty())
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.InvalidAuthInfoMsg);
            }

            try
            {
                var account = _userRepository.Queryable().Include(it => it.Customer).Where(a => a.Type == UserType.Customer && a.Username == data.Username && a.Password == MD5Helper.ToMD5Hash(data.Password)).FirstOrDefault();
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

        public ReturnMessage<CustomerDataReturnDTO> CheckRegister(CustomerRegisterDTO data)
        {
            var entity = _mapper.Map<CustomerRegisterDTO, CreateCustomerDTO>(data);
            var dto = _customerService.Create(entity);
            if(dto.HasError)
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, dto.Message);
            }

            var claims = new Claim[]
                {
                    new Claim(ClaimTypes.UserData, dto.Data.Username),
                    new Claim(ClaimTypes.NameIdentifier,dto.Data.Id.ToString()),
                };

            // Generate JWT token
            var token = _authCustomerManager.GenerateToken(claims, DateTime.UtcNow);
            var result = _mapper.Map<CustomerDTO, CustomerDataReturnDTO>(dto.Data);
            result.Token = token;
            return new ReturnMessage<CustomerDataReturnDTO>(false, result, MessageConstants.RegisterSuccess);
        }

        public ReturnMessage<CustomerDataReturnDTO> GetInfomationDTO(IEnumerable<Claim> claims)
        {
            if(claims.IsNullOrEmpty())
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
            }

            var data = GetInformationToken(claims);
            var entity = _userRepository.Queryable().Include(it => it.Customer).Where(it => it.Id == data.Id).FirstOrDefault();
            if(entity.IsNullOrEmpty())
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
            }

            var result = _mapper.Map<User, CustomerDataReturnDTO>(entity);
            result.Token = _authCustomerManager.GenerateToken(claims, DateTime.UtcNow);
            return new ReturnMessage<CustomerDataReturnDTO>(false, result, MessageConstants.LoginSuccess);
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

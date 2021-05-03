using AutoMapper;
using Common.Constants;
using Common.Enums;
using Common.Http;
using Common.MD5;
using Domain.DTOs.Customer;
using Domain.DTOs.CustomerProfileFeUser;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.AuthCustomer;
using Service.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.CustomerProfileFeUser
{
    public class CustomerProfileFeUserService : ICustomerProfileFeUserService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IAuthCustomerUserService _authCustomerUserService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CustomerProfileFeUserService(IRepository<User> userRepository, IRepository<Customer> customerRepository, IAuthCustomerUserService authCustomerUserService, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userRepository = userRepository;
            _customerRepository = customerRepository;
            _authCustomerUserService = authCustomerUserService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CustomerDataReturnDTO> ChangePassword(IEnumerable<Claim> claims, ChangePasswordCustomerProfileFeUserDTO model)
        {
            try
            {
                if (claims.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }

                var userDecompile = _authCustomerUserService.GetInformationToken(claims);
                var user = _userRepository.Queryable().FirstOrDefault(it => it.Type == UserType.Customer && it.Id == userDecompile.Id && it.Password == MD5Helper.ToMD5Hash(model.Password));

                if (user.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }

                user.ChangePassword(model);
                _userRepository.Update(user);
                _unitOfWork.SaveChanges();

                return new ReturnMessage<CustomerDataReturnDTO>(false, null, MessageConstants.UpdateSuccess);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CustomerDataReturnDTO> Update(IEnumerable<Claim> claims, UpdateCustomerProfileFeUserDTO model)
        {
            try
            {
                if (claims.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }

                var userDecompile = _authCustomerUserService.GetInformationToken(claims);

                var user = _userRepository.Queryable().FirstOrDefault(it => it.Type == UserType.Customer && it.Id == userDecompile.Id);
                if (user.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }

                var customer = _customerRepository.Find(user.CustomerId);
                if(customer.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }

                user.UpdateProfile(model);
                customer.UpdateProfile(model);

                _unitOfWork.BeginTransaction();
                _userRepository.Update(user);
                _customerRepository.Update(customer);
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();

                return new ReturnMessage<CustomerDataReturnDTO>(false, _mapper.Map<User, CustomerDataReturnDTO>(user), MessageConstants.UpdateSuccess);
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ReturnMessage<CustomerDataReturnDTO>(true, null, ex.Message);
            }
        }
    }
}

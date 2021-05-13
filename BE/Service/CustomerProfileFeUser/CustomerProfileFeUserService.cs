﻿using AutoMapper;
using Common.Constants;
using Common.Enums;
using Common.Http;
using Common.MD5;
using Domain.DTOs.Customer;
using Domain.DTOs.CustomerProfileFeUser;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Auth;
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
        private readonly IUserManager _userManager;

        public CustomerProfileFeUserService(IRepository<User> userRepository, IRepository<Customer> customerRepository, IAuthCustomerUserService authCustomerUserService, IUnitOfWork unitOfWork, IMapper mapper, IAuthService authService, IUserManager userManager)
        {
            _userRepository = userRepository;
            _customerRepository = customerRepository;
            _authCustomerUserService = authCustomerUserService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        public ReturnMessage<CustomerDataReturnDTO> ChangePassword(ChangePasswordCustomerProfileFeUserDTO model)
        {
            try
            {
                var user = _userRepository.Queryable().FirstOrDefault(it => it.Type == UserType.Customer
                                                                            && it.Id == _userManager.AuthorizedUserId
                                                                            && it.Password == MD5Helper.ToMD5Hash(model.Password));

                if (user.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }

                if(model.Password == model.NewPassword)
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.CurrentPasswordEqualNewPassword);
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

        public ReturnMessage<bool> CheckEmail(CustomerEmailDTO model)
        {
            try
            {
                var result = _userRepository.Queryable().Any(it => it.Email == model.Email);
                return new ReturnMessage<Boolean>(false, result, MessageConstants.SearchSuccess);
            }catch(Exception ex)
            {
                return new ReturnMessage<Boolean>(true, false, ex.Message);
            }
        }

        public ReturnMessage<bool> CheckPhone(CustomerPhoneDTO model)
        {
            try
            {
                var result = _customerRepository.Queryable().Any(it => it.Phone == model.Phone);
                return new ReturnMessage<Boolean>(false, result, MessageConstants.SearchSuccess);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<Boolean>(true, false, ex.Message);
            }
        }

        public ReturnMessage<bool> CheckUserName(CustomerUserNameDTO model)
        {
            try
            {
                var result = _userRepository.Queryable().Any(it => it.Username == model.Username);
                return new ReturnMessage<Boolean>(false, result, MessageConstants.SearchSuccess);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<Boolean>(true, false, ex.Message);
            }
        }

        public ReturnMessage<CustomerDataReturnDTO> UpdateProfile(UpdateCustomerProfileFeUserDTO model)
        {
            try
            {
                var user = _userRepository.Queryable()
                    .FirstOrDefault(it => it.Type == UserType.Customer && it.Id == _userManager.AuthorizedUserId && !it.IsDeleted);
                if (user.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.Error);
                }


                if (_userRepository.Queryable().Any(it => it.Email == model.Email && it.Id != user.Id))
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.ExistEmail);
                }

                if (_customerRepository.Queryable().Any(it => model.Phone.IsNotNullOrEmpty() && it.Phone == model.Phone && it.Id != user.CustomerId))
                {
                    return new ReturnMessage<CustomerDataReturnDTO>(true, null, MessageConstants.ExistPhone);
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

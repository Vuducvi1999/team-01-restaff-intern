using AutoMapper;
using Common.Constants;
using Common.Enums;
using Common.Http;
using Common.MD5;
using Common.Pagination;
using Domain.DTOs.Customer;
using Domain.DTOs.Users;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Customers
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CustomerService(IRepository<User> userRepository, IUnitOfWork unitOfWork, IMapper mapper, IRepository<Customer> customerRepository)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _customerRepository = customerRepository;
        }

        public ReturnMessage<CustomerDTO> Create(CreateCustomerDTO model)
        {
            try
            {
                if (model.Username.Trim() == "")
                    return new ReturnMessage<CustomerDTO>(false, null, MessageConstants.Error);

                var user = _mapper.Map<CreateCustomerDTO, User>(model);
                user.Password = MD5Helper.ToMD5Hash(model.Password);
                user.Insert();
                user.Type = UserType.Customer;

                var customer = _mapper.Map<CreateCustomerDTO, Customer>(model);
                customer.Insert();

                _unitOfWork.BeginTransaction();
                _userRepository.Insert(user);

                customer.UserId = user.Id;
                customer.User = user;
                _customerRepository.Insert(customer);

                _unitOfWork.SaveChanges();

                user.CustomerId = customer.Id;
                user.Customer = customer;
                _userRepository.Update(user);
                _unitOfWork.SaveChanges();

                _unitOfWork.Commit();
                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<User, CustomerDTO>(user), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CustomerDTO> Delete(DeleteCustomerDTO model)
        {
            try
            {
                var user = _userRepository.Find(model.Id);
                if (user.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
                }

                user.Delete();

                var customer = _customerRepository.Find(user.CustomerId);

                _unitOfWork.BeginTransaction();
                _userRepository.Update(user);
                if(customer.IsNotNullOrEmpty())
                {
                    customer.Delete();
                    _customerRepository.Update(customer);
                }
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();
                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<User, CustomerDTO>(user), MessageConstants.DeleteSuccess);
                return result;
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CustomerDTO> Update(UpdateCustomerDTO model)
        {
            try
            {
                if (model.Username.Trim() == "")
                    return new ReturnMessage<CustomerDTO>(false, null, MessageConstants.CreateSuccess);
                var user = _userRepository.Find(model.Id);
                if (user.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
                }

                var customer = _customerRepository.Find(user.CustomerId);
                if (customer.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
                }

                _unitOfWork.BeginTransaction();
                user.Update(model);
                _userRepository.Update(user);
                customer.Update(model);
                _customerRepository.Update(customer);
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();
                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<User, CustomerDTO>(user), MessageConstants.UpdateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CustomerDTO>> SearchPagination(SerachPaginationDTO<CustomerDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CustomerDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _userRepository.GetPaginatedList(it => it.Type == UserType.Customer && it.IsDeleted == false &&
                (search.Search == null ||
                    (
                        (
                            (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                            it.Username.Contains(search.Search.Username) ||
                            it.Email.Contains(search.Search.Email) ||
                            it.FirstName.Contains(search.Search.FirstName) ||
                            it.LastName.Contains(search.Search.LastName) ||
                            it.ImageUrl.Contains(search.Search.ImageUrl)
                        )
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.Username
                , nameof(Customer)
            );
            var data = _mapper.Map<PaginatedList<User>, PaginatedList<CustomerDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CustomerDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }
    }
}

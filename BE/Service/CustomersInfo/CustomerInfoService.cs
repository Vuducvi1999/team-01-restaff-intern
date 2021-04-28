using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Common.StringEx;
using Domain.DTOs.Customer;
using Domain.DTOs.CustomerInfo;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Customers
{
    public class CustomerInfoService : ICustomerInfoService
    {
        private readonly IRepository<Customer> _customerRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CustomerInfoService(IRepository<Customer> customerRepository, IUnitOfWork unitOfWork, IMapper mapper, IRepository<User> userRepository)
        {
            _customerRepository = customerRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public ReturnMessage<CustomerInfoDTO> Create(CreateCustomerInfoDTO model)
        {
            try
            {
                if(StringExtension.CleanString(model))
                {
                    return new ReturnMessage<CustomerInfoDTO>(true, null, MessageConstants.Error);
                }

                var entity = _mapper.Map<CreateCustomerInfoDTO, Customer>(model);
                var query = _userRepository.Queryable();
                query = query.Where(it => it.Id == entity.UserId);
                if(!query.Any())
                {
                    return new ReturnMessage<CustomerInfoDTO>(true, null, MessageConstants.Error);
                }

                var user = query.FirstOrDefault();

                if(user.CustomerId.IsNullOrEmpty())
                {
                    return new ReturnMessage<CustomerInfoDTO>(true, null, MessageConstants.Error);
                }

                entity.Insert();
                user.Update();
                user.CustomerId = entity.Id;

                _unitOfWork.BeginTransaction();
                _customerRepository.Insert(entity);
                _userRepository.Update(user);
                _unitOfWork.SaveChanges();
                _unitOfWork.Commit();

                var result = new ReturnMessage<CustomerInfoDTO>(false, _mapper.Map<Customer, CustomerInfoDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                _unitOfWork.Rollback();
                return new ReturnMessage<CustomerInfoDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CustomerInfoDTO> Delete(DeleteCustomerInfoDTO model)
        {
            try
            {
                if (!StringExtension.CleanString(model))
                {
                    return new ReturnMessage<CustomerInfoDTO>(true, null, MessageConstants.Error);
                }

                var entity = _customerRepository.Find(model.Id);
                entity.Delete();
                _customerRepository.Update(entity);
                _unitOfWork.SaveChanges();

                var result = new ReturnMessage<CustomerInfoDTO>(false, _mapper.Map<Customer, CustomerInfoDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerInfoDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CustomerInfoDTO>> SearchPagination(SerachPaginationDTO<CustomerInfoDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CustomerInfoDTO>>(false, null, MessageConstants.Error);
            }
            var resultEntity = _customerRepository.GetPaginatedList(null
                , search.PageSize
                , search.PageIndex * search.PageSize
                , t => t.UpdateByDate
                , nameof(User)
            );

            var data = _mapper.Map<PaginatedList<Customer>, PaginatedList<CustomerInfoDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CustomerInfoDTO>>(false, data, MessageConstants.ListSuccess);

            return result;
        }

        public ReturnMessage<CustomerInfoDTO> Update(UpdateCustomerInfoDTO model)
        {
            try
            {
                if (!StringExtension.CleanString(model))
                {
                    return new ReturnMessage<CustomerInfoDTO>(true, null, MessageConstants.Error);
                }

                var entity = _mapper.Map<UpdateCustomerInfoDTO, Customer>(model);
                entity.Update();
                _customerRepository.Update(entity);
                _unitOfWork.SaveChanges();

                var result = new ReturnMessage<CustomerInfoDTO>(false, _mapper.Map<Customer, CustomerInfoDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerInfoDTO>(true, null, ex.Message);
            }
        }
    }
}

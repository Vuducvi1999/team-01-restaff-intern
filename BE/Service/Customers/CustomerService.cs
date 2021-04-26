using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Common.StringEx;
using Domain.DTOs.Customer;
using Domain.Entities;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Customers
{
    public class CustomerService : ICustomerService
    {
        private readonly IRepository<Customer> _customerRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CustomerService(IRepository<Customer> customerRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CustomerDTO> Create(CreateCustomerDTO model)
        {
            try
            {
                if(!StringExtension.CleanString(model))
                {
                    return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
                }

                var entity = _mapper.Map<CreateCustomerDTO, Customer>(model);
                entity.Insert();
                _customerRepository.Insert(entity);
                _unitOfWork.SaveChanges();

                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<Customer, CustomerDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CustomerDTO> Delete(DeleteCustomerDTO model)
        {
            try
            {
                if (!StringExtension.CleanString(model))
                {
                    return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
                }

                var entity = _customerRepository.Find(model.Id);
                entity.Delete();
                _customerRepository.Update(entity);
                _unitOfWork.SaveChanges();

                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<Customer, CustomerDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CustomerDTO>> SearchPagination(SerachPaginationDTO<CustomerDTO> search)
        {
            throw new NotImplementedException();
        }

        public ReturnMessage<CustomerDTO> Update(UpdateCustomerDTO model)
        {
            try
            {
                if (!StringExtension.CleanString(model))
                {
                    return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
                }

                var entity = _mapper.Map<UpdateCustomerDTO, Customer>(model);
                entity.Update();
                _customerRepository.Update(entity);
                _unitOfWork.SaveChanges();

                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<Customer, CustomerDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }
    }
}

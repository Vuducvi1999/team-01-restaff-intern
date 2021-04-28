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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CustomerService(IRepository<User> userRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CustomerDTO> Create(CreateCustomerDTO model)
        {
            try
            {
                if (model.Username.Trim() == "" || model.Password.Trim() == "")
                    return new ReturnMessage<CustomerDTO>(false, null, MessageConstants.CreateSuccess);

                var entity = _mapper.Map<CreateCustomerDTO, User>(model);
                entity.Password = MD5Helper.ToMD5Hash(model.Password);
                entity.Insert();
                entity.Type = UserType.Customer;
                _userRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<User, CustomerDTO>(entity), MessageConstants.CreateSuccess);
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
                var entity = _userRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _userRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<User, CustomerDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<CustomerDTO> Update(UpdateCustomerDTO model)
        {
            try
            {
                if (model.Username.Trim() == "")
                    return new ReturnMessage<CustomerDTO>(false, null, MessageConstants.CreateSuccess);
                var entity = _userRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _userRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CustomerDTO>(false, _mapper.Map<User, CustomerDTO>(entity), MessageConstants.UpdateSuccess);
                    return result;
                }
                return new ReturnMessage<CustomerDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<CustomerDTO>> SearchPagination(SerachPaginationDTO<CustomerDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<CustomerDTO>>(false, null, MessageConstants.GetPaginationFail);
            }

            var resultEntity = _userRepository.GetPaginatedList(it => it.Type == UserType.Customer &&
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
            );
            var data = _mapper.Map<PaginatedList<User>, PaginatedList<CustomerDTO>>(resultEntity);
            var result = new ReturnMessage<PaginatedList<CustomerDTO>>(false, data, MessageConstants.GetPaginationSuccess);

            return result;
        }
    }
}

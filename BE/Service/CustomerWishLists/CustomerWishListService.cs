using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.CustomerWishList;
using Domain.DTOs.Products;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Service.CustomerWishLists
{
    public class CustomerWishListService: ICustomerWishListService
    {
        private readonly IRepository<CustomerWishList> _wishListRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CustomerWishListService(IRepository<CustomerWishList> wishListRepository, IRepository<Product> productRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _wishListRepository = wishListRepository;
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public ReturnMessage<CustomerWishListDTO> Create(CreateCustomerWishListDTO model)
        {
            try
            {
                var checkExistEntity = _wishListRepository.Queryable()
                                        .FirstOrDefault(i => i.CustomerId == model.CustomerId && i.ProductId == model.ProductId);

                if(checkExistEntity.IsNotNullOrEmpty())
                    return new ReturnMessage<CustomerWishListDTO>(true, null, MessageConstants.Error);

                var entity = _mapper.Map<CreateCustomerWishListDTO, CustomerWishList>(model);
                entity.Insert();
                _wishListRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<CustomerWishListDTO>(false, _mapper.Map<CustomerWishList, CustomerWishListDTO>(entity), MessageConstants.CreateSuccess);
                return result;
                
                
            }
            catch
            {
                return new ReturnMessage<CustomerWishListDTO>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<List<ProductDTO>> GetByCustomer(Guid customerId)
        {
            try
            {
                var listProductId = _wishListRepository.Queryable()
                                    .Where(i => i.CustomerId == customerId)
                                    .Select(i => i.ProductId)
                                    .ToList();
                var _isHas = listProductId.Any(i => i == new Guid("8b989928-d335-48be-99d1-d69ea5f6f757"));
                //"fad0203f-62bc-4e74-9888-a29bd518231b"
                var listProduct = _productRepository.Queryable()
                                    .Where(i => listProductId.Any(p => p == i.Id))
                                    .OrderByDescending(i => i.CreateByDate)
                                    .ToList();

                var data = _mapper.Map<List<Product>, List<ProductDTO>>(listProduct);
                var result = new ReturnMessage<List<ProductDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch
            {
                return new ReturnMessage<List<ProductDTO>>(true, null, MessageConstants.Error);
            }
        }

        public ReturnMessage<CustomerWishListDTO> Delete(DeleteCustomerWishListDTO model)
        {
            try
            {
                var entity = _wishListRepository.Queryable()
                                .FirstOrDefault(i => i.ProductId == model.ProductId && i.CustomerId == model.CustomerId);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _wishListRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<CustomerWishListDTO>(false, _mapper.Map<CustomerWishList, CustomerWishListDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<CustomerWishListDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<CustomerWishListDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<List<CustomerWishListDTO>> GetAll()
        {
            try
            {
                var entity = _wishListRepository.Queryable().OrderByDescending(t => t.CreateByDate).ToList();
                var data = _mapper.Map<List<CustomerWishList>, List<CustomerWishListDTO>>(entity);
                var result = new ReturnMessage<List<CustomerWishListDTO>>(false, data, MessageConstants.ListSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<List<CustomerWishListDTO>>(true, null, ex.Message);
            }
        }
    }
}

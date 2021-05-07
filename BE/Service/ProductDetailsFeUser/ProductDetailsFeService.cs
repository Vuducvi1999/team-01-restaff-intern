using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.ProductRating;
using Domain.DTOs.Products;
using Domain.DTOs.ProductsFeUser;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.AuthCustomer;
using Service.ProductDetailsFeUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.ServiceFeUser
{
    public class ProductDetailsFeService : IProductDetailsFeService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IRepository<ProductRating> _productRatingRepository;
        private readonly IAuthCustomerUserService _authCustomerUserService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductDetailsFeService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IUnitOfWork unitOfWork, IMapper mapper, IRepository<Customer> customerRepository, IAuthCustomerUserService authCustomerUserService, IRepository<ProductRating> productRatingRepository, IRepository<User> userRepository)
        {
            _customerRepository = customerRepository;
            _authCustomerUserService = authCustomerUserService;
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _productRatingRepository = productRatingRepository;
            _userRepository = userRepository;
        }
        public ReturnMessage<ProductDTOFeUser> GetDetails(ProductDTOFeUser search)
        {
            if (search == null)
            {
                return new ReturnMessage<ProductDTOFeUser>(false, null, MessageConstants.Error);
            }
            
            var resultEntity = _productRepository.Find(search.Id);

            _categoryRepository.Queryable().Where(it => it.Id == resultEntity.CategoryId).FirstOrDefault();

            var data = _mapper.Map<Product, ProductDTOFeUser>(resultEntity);


            var result = new ReturnMessage<ProductDTOFeUser>(false, data, MessageConstants.ListSuccess);

            return result;
        }
        public ReturnMessage<ProductRatingDTO> CreateRating(IEnumerable<Claim> claims, CreateProductRatingDTO model)
        {
            try
            {
                var userDecompile = _authCustomerUserService.GetInformationToken(claims);
                var user = _userRepository.Find(userDecompile.Id);
                var entity = _mapper.Map<CreateProductRatingDTO, ProductRating>(model);
                var product = _productRepository.Find(model.ProductId);
                entity.Insert(user);
                _productRatingRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<ProductRatingDTO>(false, _mapper.Map<ProductRating, ProductRatingDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            
            catch (Exception ex)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, ex.Message);
            }
        }
        public ReturnMessage<ProductRatingDTO> UpdateRating(UpdateProductRatingDTO model)
        {
            try
            {
                var entity = _productRatingRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _productRatingRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<ProductRatingDTO>(false, _mapper.Map<ProductRating, ProductRatingDTO>(entity), MessageConstants.DeleteSuccess);
                }
                return new ReturnMessage<ProductRatingDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<ProductRatingDTO> GetRating(IEnumerable<Claim> claims, Guid id)
        {
            if (id.IsNullOrEmpty() && id == Guid.Empty)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, MessageConstants.Error);
            }
            try 
            {
                var userDecompile = _authCustomerUserService.GetInformationToken(claims);
                var customer = _userRepository.Find(userDecompile.Id);
                var entity = _productRatingRepository.Queryable().FirstOrDefault(p => p.ProductId == id && p.CustomerId == /*new Guid("c2392707-652e-41e3-80c7-ff85961139aa")*/customer.CustomerId);
                return new ReturnMessage<ProductRatingDTO>(false, _mapper.Map<ProductRating, ProductRatingDTO>(entity), MessageConstants.DeleteSuccess);
            }
            catch(Exception ex)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, ex.Message);
            }
        }
    }
}

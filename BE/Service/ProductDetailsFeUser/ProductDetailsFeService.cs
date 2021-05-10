using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.ProductRating;
using Domain.DTOs.Products;
using Domain.DTOs.ProductsFeUser;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Service.Auth;
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
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<ProductRating> _productRatingRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserManager _userManager;

        public ProductDetailsFeService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IUnitOfWork unitOfWork, IUserManager userManager, IMapper mapper, IRepository<ProductRating> productRatingRepository)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
            _categoryRepository = categoryRepository;
            _productRatingRepository = productRatingRepository;
        }
        public ReturnMessage<ProductDTOFeUser> GetDetails(ProductDTOFeUser model)
        {
            if (model == null)
            {
                return new ReturnMessage<ProductDTOFeUser>(false, null, MessageConstants.Error);
            }
            
            var resultEntity = _productRepository.Find(model.Id);

            _categoryRepository.Queryable().Where(it => it.Id == resultEntity.CategoryId).FirstOrDefault();

            var data = _mapper.Map<Product, ProductDTOFeUser>(resultEntity);


            var result = new ReturnMessage<ProductDTOFeUser>(false, data, MessageConstants.ListSuccess);

            return result;
        }
        public ReturnMessage<ProductRatingDTO> CreateRating(CreateProductRatingDTO model)
        {
            try
            {
                var userDecompile = _userManager.GetInformationUser();
                var entity = _mapper.Map<CreateProductRatingDTO, ProductRating>(model);
                entity.CustomerId = userDecompile.CustomerId;
                entity.Insert();
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
                    return result;
                }
                return new ReturnMessage<ProductRatingDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<ProductRatingDTO> GetRating(Guid productId)
        {
            if (productId.IsNullOrEmpty() && productId == Guid.Empty)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, MessageConstants.Error);
            }
            try 
            {
                var userDecompile = _userManager.GetInformationUser();
                var entity = _productRatingRepository.Queryable().FirstOrDefault(p => p.ProductId == productId && p.CustomerId == userDecompile.CustomerId);
                return new ReturnMessage<ProductRatingDTO>(false, _mapper.Map<ProductRating, ProductRatingDTO>(entity), MessageConstants.DeleteSuccess);
            }
            catch(Exception ex)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<decimal> GetRatingPoint(Guid productId)
        {
            if (productId.IsNullOrEmpty() && productId == Guid.Empty)
            {
                return new ReturnMessage<decimal>(true, 0, MessageConstants.Error);
            }
            try
            {
                var entity = _productRatingRepository.Queryable().Where(p => p.ProductId == productId);
                decimal ratingPoint =(decimal)Math.Round(entity.Average(x => x.Rating), 1);
                return new ReturnMessage<decimal>(false, ratingPoint, MessageConstants.DeleteSuccess);
            }
            catch(Exception ex)
            {
                return new ReturnMessage<decimal>(true, 0, ex.Message);
            }
        }
    }
}

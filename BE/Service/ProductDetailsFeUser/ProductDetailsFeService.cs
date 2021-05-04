using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.ProductRating;
using Domain.DTOs.Products;
using Domain.DTOs.ProductsFeUser;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Service.AuthCustomer;
using Service.ProductDetailsFeUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.ServiceFeUser
{
    public class ProductDetailsFeService : IProductDetailsFeService
    {

        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<Customer> _customerRepository;
        private readonly IAuthCustomerUserService _authCustomerUserService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductDetailsFeService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IUnitOfWork unitOfWork, IMapper mapper, IRepository<Customer> customerRepository, IAuthCustomerUserService authCustomerUserService)
        {
            _customerRepository = customerRepository;
            _authCustomerUserService = authCustomerUserService;
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
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
        public ReturnMessage<ProductRatingDTO> CreateRating(CreateProductRatingDTO model)
        {
            try
            {
                var entity = _mapper.Map<CreateProductRatingDTO, ProductRating>(model);
                
            }
            catch(Exception ex)
            {
                return new ReturnMessage<ProductRatingDTO>(true, null, ex.Message);
            }
        }
        public ReturnMessage<ProductRatingDTO> UpdateRating(UpdateProductRatingDTO model)
        {

        }


    }
}

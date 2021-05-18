using AutoMapper;
using Common.Constants;
using Common.Http;
using Domain.DTOs.ProductsFeUser;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Service.ProductDetailsFeUser;
using System.Linq;

namespace Service.ServiceFeUser
{
    public class ProductDetailsFeService : IProductDetailsFeService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IMapper _mapper;

        public ProductDetailsFeService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
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
        
    }
}

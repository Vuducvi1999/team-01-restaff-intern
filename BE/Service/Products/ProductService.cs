using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Products;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using System;
using System.Linq;

namespace Service.Products
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProductService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _productRepository = productRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        public ReturnMessage<ProductDTO> Create(CreateProductDTO model)
        {

            try
            {
                var entity = _mapper.Map<CreateProductDTO, Product>(model);
                var category = _categoryRepository.Queryable().Where(it => it.Name == model.CategoryName).FirstOrDefault();
                if (category == null)
                {
                    return new ReturnMessage<ProductDTO>(true, null, MessageConstants.Error);
                }
                entity.CategoryId = category.Id;
                entity.Insert();
                _productRepository.Insert(entity);
                _unitOfWork.SaveChanges();
                var result = new ReturnMessage<ProductDTO>(false, _mapper.Map<Product, ProductDTO>(entity), MessageConstants.CreateSuccess);
                return result;
            }
            catch (Exception ex)
            {
                return new ReturnMessage<ProductDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<ProductDTO> Delete(DeleteProductDTO model)
        {
            try
            {
                var entity = _productRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Delete();
                    _productRepository.Delete(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<ProductDTO>(false, _mapper.Map<Product, ProductDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<ProductDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<ProductDTO>(true, null, ex.Message);
            }
        }

        public ReturnMessage<PaginatedList<ProductDTO>> SearchPagination(SerachPaginationDTO<ProductDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<ProductDTO>>(false, null, MessageConstants.DeleteSuccess);
            }
            var category = _categoryRepository.Queryable().Where(r => r.Name == search.Search.CategoryName);
            var resultEntity = _productRepository.GetPaginatedList(it => search.Search == null ||
                (
                    (
                        (search.Search.Id == Guid.Empty ? false : it.Id == search.Search.Id) ||
                        it.Name.Contains(search.Search.Name) ||
                        it.Description.Contains(search.Search.Description)
                        
                    )
                )
                , search.PageSize
                , search.PageIndex
                , t => t.Name
            );
            
            
            var data = _mapper.Map<PaginatedList<Product>, PaginatedList<ProductDTO>>(resultEntity);

            var result = new ReturnMessage<PaginatedList<ProductDTO>>(false, data, MessageConstants.DeleteSuccess);

            return result;
        }

        public ReturnMessage<ProductDTO> Update(UpdateProductDTO model)
        {
            try
            {
                var entity = _productRepository.Find(model.Id);
                if (entity.IsNotNullOrEmpty())
                {
                    entity.Update(model);
                    _productRepository.Update(entity);
                    _unitOfWork.SaveChanges();
                    var result = new ReturnMessage<ProductDTO>(false, _mapper.Map<Product, ProductDTO>(entity), MessageConstants.DeleteSuccess);
                    return result;
                }
                return new ReturnMessage<ProductDTO>(true, null, MessageConstants.Error);
            }
            catch (Exception ex)
            {
                return new ReturnMessage<ProductDTO>(true, null, ex.Message);
            }
        }
    }
}

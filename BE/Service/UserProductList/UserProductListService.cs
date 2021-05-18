using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Categories;
using Domain.DTOs.Products;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using static Common.Constants.DataType;

namespace Service.UserProductList
{
    public class UserProductListService : IUserProductListService
    {
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IMapper _mapper;

        public UserProductListService(IRepository<Category> categoryRepository, IRepository<Product> productRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public ReturnMessage<List<ProductDTO>> GetByCategory(Guid id)
        {
            try
            {
                var listDTO = _productRepository.Queryable().Where(product => !product.IsDeleted && product.CategoryId == id).ToList();
                var list = _mapper.Map<List<ProductDTO>>(listDTO);
                var result = new ReturnMessage<List<ProductDTO>>(false, list, MessageConstants.ListSuccess);
                return result;
            }

            catch (Exception ex)
            {
                return new ReturnMessage<List<ProductDTO>>(true, null, ex.Message);
            }
        }

        public ReturnMessage<IEnumerable<CategoryDTO>> GetCategory()
        {
            var entity = _categoryRepository.Queryable().Where(it => !it.IsDeleted).OrderBy(it => it.Name).ThenBy(it => it.Name.Length).ToList();
            var data = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(entity);
            var result = new ReturnMessage<IEnumerable<CategoryDTO>>(false, data, MessageConstants.ListSuccess);
            return result;
        }

        public ReturnMessage<PaginatedList<ProductDTO>> SearchPagination(SearchPaginationUserFEDTO<ProductDTO> search)
        {
            if (search == null)
            {
                return new ReturnMessage<PaginatedList<ProductDTO>>(false, null, MessageConstants.Error);
            }

            if (Pagination.CheckMinMax(search.MinPrice, search.MaxPrice))
            {
                return new ReturnMessage<PaginatedList<ProductDTO>>(false, null, MessageConstants.Error);
            }

            var query = _productRepository.Queryable().Where(it => !it.IsDeleted);

            if (search.MaxPrice > 0)
            {
                query = query.Where(it => it.Price < search.MaxPrice);
            }

            if (search.MinPrice > 0)
            {
                query = query.Where(it => it.Price > search.MinPrice);
            }

            if (search.Search.IsNotNullOrEmpty() && search.Search.CategoryName.IsNotNullOrEmpty())
            {
                query = query.Where(it => search.Search.CategoryName.Contains(it.Category.Name));
            }

            if(search.Search.IsNotNullOrEmpty() && search.Search.Name.IsNotNullOrEmpty())
            {
                query = query.Where(it => it.Name.Contains(search.Search.Name));
            }

            if (search.TypeSort.Equals((int)ETypeSort.AZ))
            {
                query = query.OrderBy(t => t.Name).ThenBy(t => t.Name.Length);
            }
            if (search.TypeSort.Equals((int)ETypeSort.ZA))
            {
                query = query.OrderByDescending(t => t.Name).ThenByDescending(t => t.Name.Length);
            }
            if (search.TypeSort.Equals((int)ETypeSort.PRICELOW))
            {
                query = query.OrderBy(t => t.Price).ThenBy(t => t.Name).ThenBy(t => t.Name.Length);
            }
            if (search.TypeSort.Equals((int)ETypeSort.PRICEHIGH))
            {
                query = query.OrderByDescending(t => t.Price).ThenBy(t => t.Name).ThenBy(t => t.Name.Length);
            }

            var entityPage = new PaginatedList<Product>(query, search.PageSize * search.PageIndex, search.PageSize);
            var data = _mapper.Map<PaginatedList<Product>, PaginatedList<ProductDTO>>(entityPage);
            var result = new ReturnMessage<PaginatedList<ProductDTO>>(false, data, MessageConstants.ListSuccess);

            return result;
        }

        public ReturnMessage<List<ProductDTO>> RelevantProduct(string name) 
        {
            var resultRevelant = _productRepository.Queryable()
                .Where(p => p.Name.Contains(name) && p.IsDeleted == false)
                .OrderBy(p => p.CreateByDate).Take(5).ToList();
            var data = _mapper.Map<List<Product>, List<ProductDTO>>(resultRevelant);
            var result = new ReturnMessage<List<ProductDTO>>(false, data, MessageConstants.SearchSuccess);
            return result;
        }
    }
}

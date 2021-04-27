﻿using AutoMapper;
using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Categories;
using Domain.DTOs.Products;
using Domain.Entities;
using Infrastructure.EntityFramework;
using Infrastructure.Extensions;
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

        public UserProductListService(IRepository<Product> productRepository, IRepository<Category> categoryRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public ReturnMessage<List<ProductDTO>> GetByCategory(Guid id)
        {
            try
            {
                var listDTO = _productRepository.Queryable().Where(product => product.CategoryId == id).ToList();
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
            var data = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(_categoryRepository.GetList());
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

            var query = _productRepository.DbSet.DynamicIncludeProperty(nameof(Category)).AsQueryable();

            if(search.MaxPrice > 0)
            {
                query = query.Where(it => it.Price < search.MaxPrice);
            }

            if(search.MinPrice > 0)
            {
                query = query.Where(it => it.Price > search.MinPrice);
            }

            if(search.Search.IsNotNullOrEmpty() && search.Search.CategoryName.IsNotNullOrEmpty())
            {
                foreach(var i in search.Search.CategoryName.Split(','))
                {
                    query = query.Where(it => it.Category.Name.Contains(i));
                }
            }

            if (search.TypeSort.Equals((int)ETypeSort.AZ))
            {
                query = query.OrderBy(t => t.Name.Length).ThenBy(t => t.Name);
            }
            if (search.TypeSort.Equals((int)ETypeSort.ZA))
            {
                query = query.OrderByDescending(t => t.Name.Length).ThenByDescending(t => t.Name);
            }
            if (search.TypeSort.Equals((int)ETypeSort.PRICELOW))
            {
                query = query.OrderBy(t => t.Price).ThenBy(t => t.Name.Length).ThenBy(t => t.Name);
            }
            if (search.TypeSort.Equals((int)ETypeSort.PRICEHIGH))
            {
                query = query.OrderByDescending(t => t.Price).ThenBy(t => t.Name.Length).ThenBy(t => t.Name);
            }

            var entityPage = new PaginatedList<Product>(query, search.PageSize * search.PageIndex, search.PageSize);
            var data = _mapper.Map<PaginatedList<Product>, PaginatedList<ProductDTO>>(entityPage);
            var result = new ReturnMessage<PaginatedList<ProductDTO>>(false, data, MessageConstants.ListSuccess);

            return result;
        }
    }
}

using AutoMapper;
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
        private readonly IRepository<Category> _repositoryCategory;
        private readonly IRepository<Product> _repositoryProduct;
        private readonly IMapper _mapper;

        public UserProductListService(IRepository<Product> repositoryProduct, IRepository<Category> repositoryCategory, IMapper mapper)
        {
            _repositoryProduct = repositoryProduct;
            _repositoryCategory = repositoryCategory;
            _mapper = mapper;
        }

        public ReturnMessage<IEnumerable<CategoryDTO>> GetCategory()
        {
            var data = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(_repositoryCategory.GetList());
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

            var query = _repositoryProduct.Queryable();

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
                foreach (var i in search.Search.CategoryName.Split(','))
                {
                    query = query.Where(it => it.Category.Name.Contains(i));
                }
            }

            if (search.Search.IsNotNullOrEmpty() && search.Search.Name.IsNotNullOrEmpty())
            {
                query = query.Where(it => it.Name.Contains(search.Search.Name));
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

﻿using Common.Http;
using Common.Pagination;
using Domain.DTOs.Products;
using Infrastructure.EntityFramework;
using Service.Common;


namespace Service.Products
{
    public interface IProductService : ICommonCRUDService<ProductDTO, CreateProductDTO, UpdateProductDTO, DeleteProductDTO>
    {
        ReturnMessage<PaginatedList<ProductDTO>> SearchPagination(SerachPaginationDTO<ProductDTO> search);
    }
}
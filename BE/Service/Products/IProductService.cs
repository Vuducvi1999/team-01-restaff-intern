using Common.Http;
using Common.Pagination;
using Domain.DTOs.Products;
using Infrastructure.EntityFramework;
using Service.Common;
using System;
using System.Collections.Generic;

namespace Service.Products
{
    public interface IProductService : ICommonCRUDService<ProductDTO, CreateProductDTO, UpdateProductDTO, DeleteProductDTO>
    {
        ReturnMessage<PaginatedList<ProductDTO>> SearchPagination(SerachPaginationDTO<ProductDTO> search);
        ReturnMessage<List<ProductDTO>> GetByCategory(Guid id);
        ReturnMessage<ProductDTO> GetById(Guid id);
        ReturnMessage<ProductDTO> UpdateCount(Guid id ,int quantity);

    }
}

using Common.Http;
using Domain.DTOs.ProductRating;
using Domain.DTOs.Products;
using Domain.DTOs.ProductsFeUser;
using Service.Common;
using System;

namespace Service.ProductDetailsFeUser
{
    public interface IProductDetailsFeService : ICommonCRUDService<ProductDTOFeUser>
    {
        ReturnMessage<ProductDTOFeUser> GetDetails(ProductDTOFeUser search);

        ReturnMessage<ProductRatingDTO> CreateRating(CreateProductRatingDTO model);

        ReturnMessage<ProductRatingDTO> UpdateRating(UpdateProductRatingDTO model);
    }
}

using Common.Http;
using Domain.DTOs.ProductRating;
using Domain.DTOs.Products;
using Domain.DTOs.ProductsFeUser;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Service.ProductDetailsFeUser
{
    public interface IProductDetailsFeService : ICommonCRUDService<ProductDTOFeUser>
    {
        ReturnMessage<ProductDTOFeUser> GetDetails(ProductDTOFeUser search);

        ReturnMessage<ProductRatingDTO> CreateRating(IEnumerable<Claim> claims, CreateProductRatingDTO model);

        ReturnMessage<ProductRatingDTO> UpdateRating(UpdateProductRatingDTO model);
    }
}

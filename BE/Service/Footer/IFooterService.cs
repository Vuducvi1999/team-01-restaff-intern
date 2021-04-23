using Common.Http;
using Domain.DTOs.Categories;
using Domain.DTOs.SocialMedias;
using System.Collections.Generic;

namespace Service.Footer
{
    public interface IFooterService
    {
        ReturnMessage<List<SocialMediaDTO>> GetSocialMedias();
        ReturnMessage<List<CategoryDTO>> GetCategories();

    }
}

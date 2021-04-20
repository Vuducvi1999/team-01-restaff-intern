﻿using Common.Http;
using Domain.DTOs.Categories;
using Domain.DTOs.SocialMedias;
using System.Collections.Generic;

namespace Service.Header
{
    public interface IHeaderService 
    {
        ReturnMessage<List<SocialMediaDTO>> GetSocialMedias();
        ReturnMessage<List<CategoryDTO>> GetCategories();

        //ReturnMessage<BlogDTO> GetBlogs();

    }
}

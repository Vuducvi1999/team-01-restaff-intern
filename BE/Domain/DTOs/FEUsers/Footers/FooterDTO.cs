using Domain.DTOs.Categories;
using Domain.DTOs.InfomationWeb;
using Domain.DTOs.PageContent;
using Domain.DTOs.SocialMedias;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.FEUsers.Footers
{
    public class FooterDTO
    {
        List<CategoryDTO> categorys { get; set; }
        List<SocialMediaDTO> socialMedias { get; set; }
        List<PageContentDTO> pageContents { get; set; }
        InformationWebDTO informationWeb { get; set; }
    }
}

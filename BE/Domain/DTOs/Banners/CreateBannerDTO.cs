﻿
namespace Domain.DTOs.Banners
{
    public class CreateBannerDTO
    {
        public string Title { get; set; }
        public int DisplayOrder { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string ImageUrl { get; set; }

    }
}
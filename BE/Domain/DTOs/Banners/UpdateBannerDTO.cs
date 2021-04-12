using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.Banners
{
    public class UpdateBannerDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public int DisplayOrder { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}

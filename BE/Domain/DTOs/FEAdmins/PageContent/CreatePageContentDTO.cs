using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.PageContent
{
    public class CreatePageContentDTO
    {
        public string Title { get; set; }
        public string ShortDes { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
    }
}

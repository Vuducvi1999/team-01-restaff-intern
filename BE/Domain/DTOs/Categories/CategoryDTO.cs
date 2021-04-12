using Domain.DTOs.BaseDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.Categories
{
    public class CategoryDTO : BaseDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
    }
}

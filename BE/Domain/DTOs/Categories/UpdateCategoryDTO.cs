using Domain.DTOs.BaseDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.Categories
{
    public class UpdateCategoryDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string UpdatedByName { get; set; }
        public Guid UpdatedBy { get; set; }


    }
}

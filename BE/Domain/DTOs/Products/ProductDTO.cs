﻿using Domain.DTOs.BaseDTOs;
using System;

namespace Domain.DTOs.Products
{
    public class ProductDTO : BaseDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsImportant { get; set; }

        public string ContentHTML { get; set; }

        public bool HasDisplayHomePage { get; set; }

        public int DisplayOrder { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
    }
}

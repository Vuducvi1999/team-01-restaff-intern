using Domain.DTOs.BaseDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.ProductRating
{
    public class ProductRatingDTO : BaseDTO
    {
        public int Rating { get; set; }
        public Guid ProductId { get; set; }
        public Guid CustomerId { get; set; }
        public string ProductName { get; set; }
        public string CustomerName { get; set; }

    }
}

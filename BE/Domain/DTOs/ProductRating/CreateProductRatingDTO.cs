using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.ProductRating
{
    public class CreateProductRatingDTO
    {
        public int Rating { get; set; }
        public Guid CustomerId { get; set; }
        public Guid ProductId { get; set; }
    }
}

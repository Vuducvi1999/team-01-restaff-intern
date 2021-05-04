using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.ProductRating
{
    public class UpdateProductRatingDTO
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public Guid CustomerId { get; set; }
        public Guid ProductId { get; set; }
        public string ProductName { get; set; }
        public string CustomerName { get; set; }
    }
}

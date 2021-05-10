using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.CustomerWishList
{
    public class CreateCustomerWishListDTO
    {
        public Guid CustomerId { get; set; }
        public Guid ProductId { get; set; }
    }
}

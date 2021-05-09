using Common.Http;
using Domain.DTOs.CustomerWishList;
using Domain.DTOs.Products;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.CustomerWishLists
{
    public interface ICustomerWishListService
    {
        public ReturnMessage<List<CustomerWishListDTO>> GetAll();
        public ReturnMessage<List<ProductDTO>> GetByCustomer(Guid customerId);
        public ReturnMessage<CustomerWishListDTO> Create(CreateCustomerWishListDTO model);
        public ReturnMessage<CustomerWishListDTO> Delete(DeleteCustomerWishListDTO model);
    }
}

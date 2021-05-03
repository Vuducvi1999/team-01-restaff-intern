using Domain.DTOs.Customer;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Service.AuthCustomer
{
    public interface IAuthCustomerUserManager
    {
        string GenerateToken(IEnumerable<Claim> claims, DateTime now);
        public CustomerDataReturnDTO GetInformationAuth(Guid id);
    }
}

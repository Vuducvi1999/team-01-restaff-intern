using Common.Http;
using Domain.DTOs.Customer;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Service.AuthCustomer
{
    public interface IAuthCustomerService
    {
        public ReturnMessage<CustomerDataReturnDTO> CheckLogin(CustomerLoginDTO data);
        CustomerDecompileDTO GetInformationToken(IEnumerable<Claim> claims);
    }
}

using Domain.DTOs.User;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Service.Auth
{
    public interface IAuthManager
    {
        string GenerateToken(IEnumerable<Claim> claims, DateTime now);
        UserDecompileDTO GetInformationToken(string token);
    }
}

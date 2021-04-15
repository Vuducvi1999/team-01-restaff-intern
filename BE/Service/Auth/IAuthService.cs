using Common.Http;
using Domain.DTOs.User;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Service.Auth
{
    public interface IAuthService
    {
        public ReturnMessage<UserDataReturnDTO> CheckLogin(UserLoginDTO data);
        UserDecompileDTO GetInformationToken(IEnumerable<Claim> claims);
    }
}

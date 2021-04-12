using Common.Http;
using Domain.DTOs.User;

namespace Service.Auth
{
    public interface IAuthService
    {
        public ReturnMessage<string> CheckLogin(UserLoginDTO data);
    }
}

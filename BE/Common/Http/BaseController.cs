using Microsoft.AspNetCore.Mvc;

namespace Common.Http
{
    public class BaseController : ControllerBase
    {
        public IActionResult CommonResponse<T>(ReturnMessage<T> data)
        {
            if (data.HasError)
            {
                return BadRequest(data);
            }
            return Ok(data);
        }
    }
}

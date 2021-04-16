using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.DTOs.User
{
    public class ChangePasswordUserDTO
    {
        [JsonIgnore]
        public Guid Id { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }

    }
}

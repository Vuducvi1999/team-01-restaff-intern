using Domain.DTOs.BaseDTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DTOs.Users
{
    public class UserDTO : BaseDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        [StringLength(7, MinimumLength = 5)]
        public string Type { get; set; }

        public Guid? CumstomerId { get; set; }
    }
}

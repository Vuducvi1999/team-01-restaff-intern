using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DTOs.Customer
{
    public class CustomerUserNameDTO
    {
        [Required]
        public string Username { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DTOs.CustomerInfo
{
    public class DeleteCustomerInfoDTO
    {
        [Required]
        public Guid Id { get; set; }
    }
}

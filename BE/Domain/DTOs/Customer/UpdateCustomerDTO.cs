using Common.Enums;
using Domain.DTOs.Files;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.DTOs.Customer
{
    public class UpdateCustomerDTO
    {
        public Guid Id { get; set; }
        [Required]
        [StringLength(35)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(35)]
        public string LastName { get; set; }
        [StringLength(90)]
        public string Address { get; set; }
        [Required]
        [StringLength(90)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [StringLength(11)]
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public string ImageUrl { get; set; }
        public List<FileDTO> Files { get; set; }
    }
}

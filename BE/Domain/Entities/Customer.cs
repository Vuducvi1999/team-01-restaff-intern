using Domain.DTOs.Customer;
using Infrastructure.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Customer : BaseEntity
    {
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
        public string Email { get; set;}
        [StringLength(11)]
        [DataType(DataType.PhoneNumber)]
        public string Phone { get; set; }

        public Guid? UserId { get; set; }
        public virtual User User { get; set; }

        public override void Insert()
        {
            base.Insert();
            Phone = Phone.IsNullOrEmpty() ? "" : Phone;
            Address = Address.IsNullOrEmpty() ? "" : Address;
        }

        public override void Delete()
        {
            base.Delete();
        }

        public override void Update()
        {
            base.Update();
        }

        public void Update(UpdateCustomerDTO dto)
        {
            base.Update();
            FirstName = dto.FirstName;
            LastName = dto.LastName;
            Email = dto.Email;
            Phone = dto.Phone;
            Address = dto.Address;
        }
    }
}

using Domain.DTOs.User;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class User : BaseEntity
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageUrl { get; set; }

        public void Update(UpdateUserDTO model)
        {
            Email = model.Email;
            FirstName = model.FirstName;
            LastName = model.LastName;
            ImageUrl = model.ImageUrl;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }

}

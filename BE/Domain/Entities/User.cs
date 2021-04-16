﻿using Common.MD5;
using Domain.DTOs.User;
using Domain.DTOs.Users;
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
        public void Insert()
        {
            Id = Guid.NewGuid();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }

        public void Delete()
        {
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public void Update(UpdateUserDTO model)
        {
            Username = model.Username;
            Password = MD5Helper.ToMD5Hash(model.Password);
            Email = model.Email;
            FirstName = model.FirstName;
            LastName = model.LastName;
            ImageUrl = model.ImageUrl;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }

        public void ChangePassword(ChangePasswordUserDTO model)
        {
            model.NewPassword = MD5Helper.ToMD5Hash(model.NewPassword);
            Password = model.NewPassword;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }

    }

}

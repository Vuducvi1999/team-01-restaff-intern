using Domain.DTOs.DataSeed;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class DataSeedWebsite : BaseEntity
    {
        //Address , Phone, Email, Fax, Logo
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Fax { get; set; }
        public string Logo { get; set; }

        public void Update(UpdateDataSeedDTO model)
        {
            base.Update();
            Address = model.Address;
            Email = model.Email;
            Fax = model.Fax;
            Phone = model.Phone;
            Logo = model.Logo;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }

}

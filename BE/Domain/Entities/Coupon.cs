using Domain.DTOs.Coupons;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Coupon : BaseEntity
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public bool HasPercent { get; set; }
        public decimal Value { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public void Insert()
        {
            Id = Guid.NewGuid();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }
        public void Delete()
        {
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public void Update(UpdateCouponDTO model)
        {
            Code = model.Code;
            Name = model.Name;
            HasPercent = model.HasPercent;
            Value = model.Value;
            StartDate = model.StartDate;
            EndDate = model.EndDate;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

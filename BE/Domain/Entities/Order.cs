using Common.Constants;
using Domain.DTOs.Orders;
using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Order : BaseEntity

    {
        public string FullName { get; set; }
        public string Code { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public decimal TotalAmount { get; set; }
        public int TotalItem { get; set; }
        public string Note { get; set; }
        public Guid? CustomerId { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }

        public override void Insert()
        {

            base.Insert();
            Code = CodeConstants.Code + DateTime.Now.ToString("ddMMyyyyHHmmssfff");
            TotalItem = 0;
            TotalAmount = 0;
            Status = "New";
            foreach (var item in OrderDetails)
            {
                item.OrderId = this.Id;
                item.Insert();
                TotalItem += item.Quantity;
                TotalAmount += item.TotalAmount;
            }
        }
        public override void Delete()
        {
            base.Delete();
        }

        public void Update(UpdateOrderDTO model)
        {
            base.Update();
            FullName = model.FullName;
            Address = model.Address;
            Phone = model.Phone;
            Email = model.Email;
            Status = model.Status;
            TotalAmount = model.TotalAmount;
            TotalItem = model.TotalItem;

            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }

}

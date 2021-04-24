using Domain.DTOs.OrderDetails;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class OrderDetail : BaseEntity

    {
        public string FullName { get; set; }
        public Guid OrderId { get; set; }
        public Guid ProductId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int TotalAmount { get; set; }


        public override void Insert()
        {
            base.Insert();
        }
        public override void Delete()
        {
            base.Delete();
        }

        public void Update(UpdateOrderDetailDTO model)
        {
            base.Update();

            FullName = model.FullName;
            OrderId = model.OrderId;
            ProductId = model.ProductId;
            Price = model.Price;
            Quantity = model.Quantity;
            TotalAmount = model.TotalAmount;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

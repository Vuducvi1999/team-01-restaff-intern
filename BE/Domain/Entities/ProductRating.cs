using Domain.DTOs.ProductRating;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class ProductRating : BaseEntity
    {
        public Guid CustomerId { get; set; }
        public Guid ProductId { get; set; }
        public int Rating { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }

        public override void Insert()
        {
            base.Insert();
        }

        public void Update(UpdateProductRatingDTO model)
        {
            base.Update();
            CustomerId = model.CustomerId;
            ProductId = model.ProductId;
            Rating = model.Rating;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

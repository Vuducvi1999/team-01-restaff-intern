using Domain.DTOs.ProductRating;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class ProductRating : BaseEntity
    {
        public Guid? CustomerId { get; set; }
        public Guid? ProductId { get; set; }
        public int Rating { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Product Product { get; set; }

        public override void Insert()
        {
            base.Insert();
        }

        public void Insert(User user)
        {
            base.Insert();
            CustomerId = user.CustomerId;
        }

        public void Update(UpdateProductRatingDTO model)
        {
            base.Update();
            Rating = model.Rating;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

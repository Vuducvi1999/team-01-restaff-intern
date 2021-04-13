using Domain.DTOs.Banners;
using Domain.DTOs.Suppliers;
using System;

namespace Domain.Entities
{
    public class Banner : BaseEntity
    {
        public int DisplayOrder { get; set; }
        public string ImageUrl { get; set; }
        public string Link { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }


        public void Insert()
        {
            Id = Guid.NewGuid();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }
        public void Delete()
        {
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public void Update(UpdateBannerDTO model)
        {
            Title = model.Title;
            Description = model.Description;
            DisplayOrder = model.DisplayOrder;
            ImageUrl = model.ImageUrl;
            Link = model.Link;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

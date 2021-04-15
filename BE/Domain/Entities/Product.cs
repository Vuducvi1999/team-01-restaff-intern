
using Domain.DTOs.Products;
using System;

namespace Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsImportant { get; set; }

        public string ContentHTML { get; set; }

        public bool HasDisplayHomePage { get; set; }

        public int DisplayOrder { get; set; }

        public Guid CategoryId { get; set; }
        public void Insert()
        {
            Id = Guid.NewGuid();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }
        public void Delete()
        {
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public void Update(UpdateProductDTO model)
        {
            Name = model.Name;
            Description = model.Description;
            IsImportant = model.IsImportant;
            ContentHTML = model.ContentHTML;
            HasDisplayHomePage = model.HasDisplayHomePage;
            DisplayOrder = model.DisplayOrder;
            CategoryId = model.CategoryId;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

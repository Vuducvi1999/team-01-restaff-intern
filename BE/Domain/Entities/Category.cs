using Domain.DTOs.Categories;
using System;

namespace Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public void Insert()
        {
            Id = Guid.NewGuid();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }
        public void Delete()
        {
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public void Update(UpdateCategoryDTO model)
        {
            Name = model.Name;
            Description = model.Description;
            ImageUrl = model.ImageUrl;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

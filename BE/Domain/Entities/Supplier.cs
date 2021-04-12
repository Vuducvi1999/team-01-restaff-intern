using Domain.DTOs.Suppliers;
using System;

namespace Domain.Entities
{
    public class Supplier : BaseEntity
    {
        public string Name { get; set; }
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

        public void Update(UpdateSupplierDTO model)
        {
            Name = model.Name;
            Description = model.Description;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

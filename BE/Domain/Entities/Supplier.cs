using Domain.DTOs.Suppliers;
using System;

namespace Domain.Entities
{
    public class Supplier : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public override void Insert()
        {
            base.Insert();
        }
        public override void Delete()
        {
            base.Delete();
        }

        public void Update(UpdateSupplierDTO model)
        {
            base.Update();
            Name = model.Name;
            Description = model.Description;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

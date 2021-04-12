using System;

namespace Domain.DTOs.Suppliers
{
    public class UpdateSupplierDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

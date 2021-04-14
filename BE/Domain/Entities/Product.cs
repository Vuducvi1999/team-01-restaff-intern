
using System;

namespace Domain.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsImportant { get; set; }
        public Guid CategoryId { get; set; }
    }
}

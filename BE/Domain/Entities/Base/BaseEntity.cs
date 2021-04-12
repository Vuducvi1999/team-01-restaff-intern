using Infrastructure.EntityFramework;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class BaseEntity : IObjectState
    {
        [Key, Required]
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string CreatedByName { get; set; }
        public Guid CreatedBy { get; set; }
        public string UpdatedByName { get; set; }
        public Guid UpdatedBy { get; set; }
        public string DeletedByName { get; set; }
        public Guid DeletedBy { get; set; }
        [NotMapped]
        public ObjectState ObjectState { get; set; }
    }
}

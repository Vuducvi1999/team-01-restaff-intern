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
        public DateTime CreateByDate { get; set; }
        public DateTime UpdateByDate { get; set; }
        public DateTime DeleteByDate { get; set; }

        [NotMapped]
        public ObjectState ObjectState { get; set; }

        public virtual void Insert()
        {
            Id = Guid.NewGuid();
            IsActive = false;
            IsDeleted = false;
            CreateByDate = DateTime.Now;
            UpdateByDate = DateTime.Now;
            DeleteByDate = new DateTime();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }
        public virtual void Delete()
        {
            DeleteByDate = DateTime.Now;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public virtual void Update()
        {
            UpdateByDate = DateTime.Now;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

using Domain.DTOs.BaseDTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.Categories
{
    public class DeleteCategoryDTO
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public string DeletedByName { get; set; }
        public Guid DeletedBy { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class File : BaseEntity
    {
        public String Name { get; set; }
        public String Url { get; set; }
        public String FileExt { get; set; }
        public String EntityType { get; set; }
        public String EntityId { get; set; }
    }
}

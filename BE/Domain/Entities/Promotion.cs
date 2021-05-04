using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Promotion : BaseEntity
    {
        //(Title, Description, StartDate, EndDate, Value,ImageUrl, HasPercent)
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndtDate { get; set; }
        public decimal Value { get; set; }
        public string ImageUrl { get; set; }
        public bool HasPercent { get; set; }
    }
}

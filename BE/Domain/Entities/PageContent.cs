﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class PageContent: BaseEntity
    {
        public string Title { get; set; }
        public string ShortDes { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
    }
}
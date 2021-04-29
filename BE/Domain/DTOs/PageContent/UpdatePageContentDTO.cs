﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.PageContent
{
    public class UpdatePageContentDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ShortDes { get; set; }
        public string Description { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTOs.SocialMedias
{
    public class CreateSocialMediaDTO
    {
        public string Title { get; set; }

        public string Link { get; set; }

        public string IconUrl { get; set; }

        public int DisplayOrder { get; set; }
    }
}
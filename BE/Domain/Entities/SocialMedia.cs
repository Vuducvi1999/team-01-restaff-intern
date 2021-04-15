using Domain.DTOs.SocialMedias;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class SocialMedia : BaseEntity
    {
        public string Title { get; set; }

        public string Link { get; set; }

        public string IconUrl { get; set; }

        public int DisplayOrder { get; set; }

        public void Insert()
        {
            Id = Guid.NewGuid();
            ObjectState = Infrastructure.EntityFramework.ObjectState.Added;
        }

        public void Delete()
        {
            ObjectState = Infrastructure.EntityFramework.ObjectState.Deleted;
        }

        public void Update(UpdateSocialMediaDTO model)
        {
            Title = model.Title;
            Link = model.Link;
            IconUrl = model.IconUrl;
            DisplayOrder = model.DisplayOrder;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

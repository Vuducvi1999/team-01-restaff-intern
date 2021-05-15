using Domain.DTOs.Blogs;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Blog : BaseEntity
    {
        public string Title { get; set; }

        public string ShortDes { get; set; }

        public string ContentHTML { get; set; }

        public string ImageUrl { get; set; }

        public decimal RatingScore { get; set; }

        public override void Insert()
        {
            base.Insert();
        }

        public override void Delete()
        {
            base.Delete();
        }

        public void Update(UpdateBlogDTO model)
        {
            base.Update();
            Title = model.Title;
            ShortDes = model.ShortDes;
            ContentHTML = model.ContentHTML;
            ImageUrl = model.ImageUrl;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

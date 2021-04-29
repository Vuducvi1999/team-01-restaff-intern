using Domain.DTOs.PageContent;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class PageContent : BaseEntity
    {
        public string Title { get; set; }
        public string ShortDes { get; set; }
        public string Description { get; set; }
        public int Order { get; set; }
        public void Update(UpdatePageContentDTO model)
        {
            base.Update();
            Title = model.Title;
            ShortDes = model.ShortDes;
            Description = model.Description;
            ObjectState = Infrastructure.EntityFramework.ObjectState.Modified;
        }
    }
}

using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Constants
{
    public struct PageContentConstants
    {
        public static Guid Shipping = new Guid("00000000-0000-0000-0000-000000000001");
        public static Guid ContactUs = new Guid("00000000-0000-0000-0000-000000000002");
        public static Guid AboutUs = new Guid("00000000-0000-0000-0000-000000000003");

        public static readonly Dictionary<Guid, PageContent> ListPageContents = new Dictionary<Guid, PageContent>() {
            { 
                Shipping, new PageContent(){ Order = 1, Title = "Shipping"} },
            { ContactUs, new PageContent(){ Order = 2, Title = "Contact Us"}} ,
            { AboutUs, new PageContent() { Order = 3 , Title = "About Us"} }
        };
    }
}

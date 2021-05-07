using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Constants
{
    public struct CommonConstants
    {
        public static Guid WebSiteInformationId = Guid.Parse("00000000-0000-0000-0000-000000000001");
        public static string Address = "67 Tran Huy Lieu";
        public static string Email = "email@gmail.com";
        public static string Fax = "656565655656";
        public static string Logo = "logo1";
        public static string Phone = "776767776767";

    }
    public struct CommonConstantsUser
    {
        public static string Name = "Product ";
        public static string Description = "Description for Product ";
        public static string ContentHTML = "Content for Product ";
        public static decimal Price = 1000000;
        public static int DisplayOrder = 1;
        public static string ImageUrl = "https://res.cloudinary.com/tungimage/image/upload/v1620230565/x1kv8vatwdtebbjnzkdv.jpg,https://res.cloudinary.com/tungimage/image/upload/v1620233950/pyv3241siykegow7phjf.jpg";
    }
    public struct CommonConstantsCategory
    {
        public static string Name = "Category ";
        public static string Description = "Description for Category ";
        public static string ImageUrl = "https://res.cloudinary.com/tungimage/image/upload/v1620233950/pyv3241siykegow7phjf.jpg";
    }
}

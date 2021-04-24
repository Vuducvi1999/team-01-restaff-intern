using System.IO;

namespace Common.Constants
{
    public struct UrlConstants
    {
        public const string Host = "https://localhost:44309";

        public static string BaseLocalUrlFile = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Files");
        public static string BaseCloudUrlFile = Path.Combine(Host, "Files");

        public const string BaseApi = "/api";

        public const string BaseSupplier = BaseApi + "/supplier";

        public const string BaseSocialMedia = BaseApi + "/social-media";

        public const string BaseAuth = BaseApi + "/auth";

        public const string BaseBanner = BaseApi + "/banner";

        public const string BaseLogin = BaseAuth + "/login";

        public const string BaseProfile = BaseApi + "/profile";

        public const string BaseCategory = BaseApi + "/category";
        public const string BaseCategoryFeUser = BaseApi + "/user/category";

        public const string BaseFile = BaseApi + "/file";
        public const string BaseFileDownload = BaseFile + "/download";
        public const string BaseFileGetType = BaseFile + "/type";

        public const string BaseCoupon = BaseApi + "/coupon";
        public const string BaseUser= BaseApi + "/user";

        public const string BaseProduct = BaseApi + "/product";
        public const string BaseProductFeUser = BaseApi + "/user/product";

        public const string BaseHeader = BaseApi + "/header";
        public const string BaseFooter = BaseApi + "/footer";

        public const string BaseBlog = BaseApi + "/blog";
        public const string BaseHome = BaseApi + "/home";

        public const string TopCollection = "top-collection";
        public const string NewProducts = "new-products";
        public const string BestSeller = "best-seller";
        public const string FeaturedProducts = "featured-products";
        public const string OnSale = "on-sale";
        public const string Blogs = "blogs";

        public const string TopBlog = BaseBlog + "/topblog";
        public const string RecentBlog = BaseBlog + "/recentblog";
        public const string GetBlog = BaseBlog + "/{id}";
    }
}

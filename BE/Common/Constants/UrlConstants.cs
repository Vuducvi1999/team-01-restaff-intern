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

        public const string BaseAuth = BaseApi + "/auth";
        public const string BaseLogin = BaseAuth + "/login";

        public const string BaseBanner = BaseApi + "/banner";

        public const string BaseFile = BaseApi + "/file";
        public const string BaseFileDownload = BaseFile + "/download";
    }
}

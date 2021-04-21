using System;
using System.Collections.Generic;
namespace Common.Constants
{
    public struct DataType
    {
        public static Dictionary<string, string> TypeName = new Dictionary<string, string>()
        {
            {"banner", "BAN" },
            {"category", "CATE" },
            {"file", "FILE" },
            {"product", "PRO" },
            {"socialmedia", "SOC" },
            {"user", "USER" },
        };

        public enum ETypeFile
        {
            Image,
            File
        }

        public static Dictionary<string, ETypeFile> TypeFile = new Dictionary<string, ETypeFile>()
        {
            { "BAN", ETypeFile.Image },
            { "CATE", ETypeFile.Image },
            { "FILE",ETypeFile.File },
            { "PRO", ETypeFile.Image },
            { "SOC", ETypeFile.Image },
            { "USER", ETypeFile.Image },
        };

        public static Dictionary<ETypeFile, string> TypeAccept = new Dictionary<ETypeFile, string>()
        {
            { ETypeFile.Image, ".jpg, .jpeg, .png, .icon" },
            { ETypeFile.File, ".jpg, .jpeg, .png, .icon, .doc, .docx, .xls, .xlsx, .pdf, .pptx, .ppt, .txt" },
        };

        public static bool CheckTypeAccept(String typeFile, String ext)
        {
            var eTypeFile = TypeFile[typeFile];
            var typeAccept = TypeAccept[eTypeFile];
            if (typeAccept.Contains(ext))
            {
                return true;
            }
            return false;
        }
    }
}

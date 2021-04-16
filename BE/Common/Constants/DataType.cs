using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Constants
{
    public struct DataType
    {
        public static Dictionary<string, string> Type = new Dictionary<string, string>()
        {
            {"banner", "BAN" },
            {"category", "CATE" },
            {"file", "FILE" },
            {"product", "PRO" },
            {"socialmedia", "SOC" },
            {"user", "USER" },
        };
    }
}

using System.Linq;


namespace Common.StringEx
{
    public class StringExtension
    {
        public static bool CleanString(object model)
        {
            var stringItems = model.GetType().GetProperties()
                    .Where(p => p.PropertyType == typeof(string));
            foreach (var stringItem in stringItems)
            {
                if(stringItem.GetValue(model) == null)
                {
                    continue;
                }
                
                if (stringItem.GetValue(model).ToString() == "")
                {
                    continue;
                }

                if(stringItem.GetValue(model).ToString().Trim() == "")
                {
                    return false;
                }

                if(stringItem.GetValue(model).ToString().EndsWith(""))
                {
                    return false;
                }
                
                if(stringItem.GetValue(model).ToString().StartsWith(""))
                {
                    return false;
                }
                var currentItem = stringItem.GetValue(model).ToString().Trim();
            }
            return true;
        }
    }
}

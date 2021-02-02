using System.Collections.Generic;
using System.Linq;

namespace InvoiceGeneratorAPI.Const
{
    public static class States
    {
        public const string Open = "Open";
        public const string Closed = "Closed";

        public static List<string> GetStatesValues()
        {
            var classType = typeof(States);

            return classType.GetFields().Select(field => field.GetRawConstantValue()?.ToString()).ToList();
        }
    }
}

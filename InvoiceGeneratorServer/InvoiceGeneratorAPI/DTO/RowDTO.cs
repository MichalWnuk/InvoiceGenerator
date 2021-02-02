using System.Collections.Generic;

namespace InvoiceGeneratorAPI.DTO
{
    public class RowDTO
    {
        public int Id { get; set; }

        public IEnumerable<DayDTO> Days { get; set; }

        public int RateTypeId { get; set; }

        public int TimesheetId { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace InvoiceGeneratorAPI.DTO
{
    public class TimesheetDTO
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public virtual IEnumerable<RowDTO> Rows { get; set; }

        public string State { get; set; }

        public string UserId { get; set; }
    }
}

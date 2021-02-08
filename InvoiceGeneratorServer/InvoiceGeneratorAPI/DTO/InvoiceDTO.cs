using System;

namespace InvoiceGeneratorAPI.DTO
{
    public class InvoiceDTO
    {
        public int Id { get; set; }

        public string InvoiceNumber { get; set; }

        public DateTime GeneratedDate { get; set; }

        public int TimesheetId { get; set; }

        public string InvoiceForMonth { get; set; }

        public string InvoiceForYear { get; set; }
    }
}

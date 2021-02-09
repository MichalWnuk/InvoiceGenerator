using System.Collections.Generic;

namespace InvoiceGeneratorAPI.DTO
{
    public class InvoiceDataDTO
    {
        public string Id { get; set; }

        public string IssuedDate { get; set; }

        public string IssuedPlace { get; set; }

        public string InvoiceNumber { get; set; }

        public InvoiceSettingsDTO InvoiceSettings { get; set; }

        public ICollection<InvoiceItemDTO> InvoiceItems { get; set; }

        public string TimesheetId { get; set; }

        public string InvoiceForMonth { get; set; }

        public string InvoiceForYear { get; set; }

        public string TaxRate { get; set; }

        public string SummaryNetAmount { get; set; }

        public string SummaryTaxAmount { get; set; }

        public string SummaryGrossAmount { get; set; }

        public string SellDate { get; set; }

        public string PayToDate { get; set; }

        public string IssuedBy { get; set; }
    }
}

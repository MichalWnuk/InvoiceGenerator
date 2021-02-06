using System.Collections.Generic;

namespace InvoiceGeneratorAPI.DTO
{
    public class InvoiceDTO
    {
        public string Number { get; set; }

        public string CreatedDate { get; set; } // saving Timesheet Send Date

        public string SellDate { get; set; } // saving Timesheet Send Date

        public string PayToDate { get; set; }

        public string SellerName { get; set; } // Create Invoice Data settings

        public string SellerAddressLine1 { get; set; } // Create Invoice Data settings

        public string SellerAddressLine2 { get; set; } // Create Invoice Data settings

        public string SellerTaxId { get; set; } // Create Invoice Data settings

        public string SellerEmail { get; set; } // Create Invoice Data settings

        public string SellerBankName { get; set; } // Create Invoice Data settings

        public string SellerAccountNumber { get; set; } // Create Invoice Data settings

        public string BuyerName { get; set; } // Create Invoice Data settings

        public string BuyerAddressLine1 { get; set; } // Create Invoice Data settings

        public string BuyerAddressLine2 { get; set; } // Create Invoice Data settings

        public string BuyerPhone { get; set; } // Create Invoice Data settings

        public string BuyerTaxId { get; set; } // Create Invoice Data settings

        public ICollection<string> RowTitles { get; set; }

        public ICollection<string> MeasureCounts { get; set; }

        public ICollection<string> RateAmounts { get; set; }

        public ICollection<string> NetPrices { get; set; }

        public ICollection<string> TaxAmounts { get; set; }

        public ICollection<string> GrossPrices { get; set; }

        public string SummaryNetAmount { get; set; }

        public string SummaryTaxAmount { get; set; }

        public string SummaryGrossAmount { get; set; }

        public string IssuedBy { get; set; } // Create Invoice Data settings
    }
}

namespace InvoiceGeneratorAPI.DTO
{
    public class InvoiceItemDTO
    {
        public string Title { get; set; }

        public string Count { get; set; }

        public string Metric { get; set; }

        public string NetPrice { get; set; }

        public string NetAmount { get; set; }

        public string TaxRate { get; set; }

        public string TaxAmount { get; set; }

        public string GrossAmount { get; set; }
    }
}

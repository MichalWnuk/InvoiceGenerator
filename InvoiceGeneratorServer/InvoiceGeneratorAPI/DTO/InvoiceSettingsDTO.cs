namespace InvoiceGeneratorAPI.DTO
{
    public class InvoiceSettingsDTO
    {
        public string SellerName { get; set; }

        public string SellerAddressLine1 { get; set; }

        public string SellerAddressLine2 { get; set; }

        public string SellerTaxId { get; set; }

        public string SellerEmail { get; set; }

        public string SellerBankName { get; set; }

        public string SellerAccountNumber { get; set; }

        public string BuyerName { get; set; }

        public string BuyerAddressLine1 { get; set; }

        public string BuyerAddressLine2 { get; set; }

        public string BuyerPhone { get; set; }

        public string BuyerTaxId { get; set; }

        public string IssuedBy { get; set; }
    }
}

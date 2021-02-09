using System.ComponentModel.DataAnnotations;
using InvoiceGeneratorAPI.DTO;

namespace InvoiceGeneratorAPI.Models
{
    public class UserInvoiceSettings
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        [Required]
        public string SellerName { get; set; } = string.Empty;

        [Required]
        public string SellerAddressLine1 { get; set; } = string.Empty;

        [Required]
        public string SellerAddressLine2 { get; set; } = string.Empty;

        [Required]
        public string SellerTaxId { get; set; } = string.Empty;

        public string SellerEmail { get; set; } = string.Empty;

        [Required]
        public string SellerBankName { get; set; } = string.Empty;

        [Required]
        public string SellerAccountNumber { get; set; } = string.Empty;

        [Required]
        public string BuyerName { get; set; } = string.Empty;

        [Required]
        public string BuyerAddressLine1 { get; set; } = string.Empty;

        [Required]
        public string BuyerAddressLine2 { get; set; } = string.Empty;

        public string BuyerPhone { get; set; } = string.Empty;

        [Required]
        public string BuyerTaxId { get; set; } = string.Empty;

        [Required] public string IssuedBy { get; set; } = string.Empty;

        public void UpdatePropertiesFromDto(InvoiceSettingsDTO dto)
        {
            SellerName = dto.SellerName;
            SellerTaxId = dto.SellerTaxId;
            SellerAccountNumber = dto.SellerAccountNumber;
            SellerAddressLine1 = dto.SellerAddressLine1;
            SellerAddressLine2 = dto.SellerAddressLine2;
            SellerBankName = dto.SellerBankName;
            SellerEmail = dto.SellerEmail;
            BuyerAddressLine1 = dto.BuyerAddressLine1;
            BuyerAddressLine2 = dto.BuyerAddressLine2;
            BuyerTaxId = dto.BuyerTaxId;
            BuyerName = dto.BuyerName;
            BuyerPhone = dto.BuyerPhone;
            IssuedBy = dto.IssuedBy;
        }
    }
}

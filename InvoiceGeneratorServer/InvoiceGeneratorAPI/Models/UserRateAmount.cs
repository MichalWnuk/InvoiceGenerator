using System.ComponentModel.DataAnnotations;

namespace InvoiceGeneratorAPI.Models
{
    public class UserRateAmount
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }

        [Required]
        public int RateTypeId { get; set; }

        public virtual RateType RateType { get; set; }

        public double RateAmount { get; set; }
    }
}

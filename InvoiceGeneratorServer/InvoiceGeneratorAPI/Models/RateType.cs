using System.ComponentModel.DataAnnotations;

namespace InvoiceGeneratorAPI.Models
{
    public class RateType
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string Type { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace InvoiceGeneratorAPI.Models
{
    public class Row
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string Days { get; set; }

        [Required]
        public int RateTypeId { get; set; }

        public virtual RateType RateType { get; set; }

        [Required]
        public int TimesheetId { get; set; }

        public virtual Timesheet Timesheet { get; set; }
    }
}

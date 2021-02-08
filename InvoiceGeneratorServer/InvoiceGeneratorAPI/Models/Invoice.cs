using System;
using System.ComponentModel.DataAnnotations;

namespace InvoiceGeneratorAPI.Models
{
    public class Invoice
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public string InvoiceNumber { get; set; }

        [Required]
        public DateTime GeneratedDate { get; set; }

        [Required]
        public byte[] FileArray { get; set; }

        [Required]
        public int TimesheetId { get; set; }

        public virtual Timesheet Timesheet { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}

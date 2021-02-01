using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace InvoiceGeneratorAPI.Models
{
    public class Timesheet
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public virtual ICollection<Row> Rows { get; set; }

        [Required]
        public string State { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual ApplicationUser User { get; set; }
    }
}

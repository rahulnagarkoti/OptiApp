using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataLayer.Models
{
    public class Appointments
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }
        [ForeignKeyAttribute("CustomerId")]
        public Customers Customer { get; set; }      

        public int? DoctorId { get; set; }
        [ForeignKeyAttribute("DoctorId")]
        public Doctors Doctor { get; set; }

        [Required]
        public DateTime VisitDate { get; set; }       

        [StringLength(20)]
        public string LeftEye { get; set; }

        [StringLength(20)]
        public string RightEye { get; set; }

        [StringLength(150)]
        public string Description { get; set; }

    }
}

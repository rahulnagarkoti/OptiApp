using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataLayer.Models
{
    public class Customers
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Display(Name="Full Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Gender")]
        public Gender Gender { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Contact Details")]
        public string ContactNumber { get; set; }

        [Required]
        [Display(Name = "D.O.B")]
        public DateTime DOB { get; set; }

        [Required]
        [StringLength(50)]
        [Display(Name = "Address")]
        public string Address { get; set; }

    }
}

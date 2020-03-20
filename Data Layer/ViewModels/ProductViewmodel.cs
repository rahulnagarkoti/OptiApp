using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataLayer.ViewModels
{
    public class ProductViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        [Display(Name = "Name")]
        public string Name { get; set; }

        [Required]
        [Display(Name="Stock Count")]
        public int StockCount { get; set; }

        [Required]
        [Display(Name = "Cost Price")]
        public decimal CostPrice { get; set; }


        [Display(Name="Distributor Name")]
        public string   DistributorName { get; set; }

        [Required]
        [Display(Name = "Distributor Name")]
        public int DistributorId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataLayer.Models
{
    public class Products
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Name { get; set; }

        [Required]
        public int StockCount { get; set; }

        [Required]
        public decimal CostPrice { get; set; }
                
        [Required]
        public int DistributorId { get; set; }

        [ForeignKey("DistributorId")]
        public Distributors Distributor { get; set; }
    }
}

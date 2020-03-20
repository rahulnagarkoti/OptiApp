using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataLayer.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [ForeignKeyAttribute("CustomerId")]
        public Customers Customer { get; set; }

        [Required]
        public decimal LeftEye { get; set; }

        [Display(Name = "Right Eye")]
        public decimal RightEye { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }

        public IEnumerable<Details> Details { get; set; }

    }

    public class Details 
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int OrderId { get; set; }

        [ForeignKeyAttribute("OrderId")]
        public Order Order { get; set; }

        [Required]
        public int ProductId { get; set; }

        [ForeignKeyAttribute("ProductId")]
        public Products Products { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [Display(Name = "AdvanceAmount")]
        public decimal AdvanceAmount { get; set; }

        [Required]
        [Display(Name = "TotalAmount")]
        public decimal TotalAmount { get; set; }


        [Required]
        public DateTime DeliveryDate { get; set; }
    }
}

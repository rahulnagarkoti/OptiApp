using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DataLayer.ViewModels
{
    public class OrderViewModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        [Required]
        [Display(Name = "Left Eye")]
        public decimal LeftEye { get; set; }

        [Required]
        [Display(Name = "Right Eye")]
        public decimal RightEye { get; set; }

        [Display(Name = "OrderDate")]
        public DateTime OrderDate { get; set; }


        public IEnumerable<DetailsVM> DetailsVM { get; set; }

    }

    public class DetailsVM
    {
        public int OrderId { get; set; }

        [Required]
        public int ProductId { get; set; }
        public string ProductName { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        [Display(Name = "AdvanceAmount")]
        public decimal AdvanceAmount { get; set; }

        [Required]
        [Display(Name = "TotalAmount")]
        public decimal TotalAmount { get; set; }

        [Required]
        [Display(Name = "Delivery Date")]
        public DateTime DeliveryDate { get; set; }
    }
}

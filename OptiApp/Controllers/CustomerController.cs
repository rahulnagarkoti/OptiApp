using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuisnessLayer.Interface;
using DataLayer.Models;
using DataLayer.ViewModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OptiApp.Controllers
{
    public class CustomerController : Controller
    {
        private readonly ICustomerBL _customerBL;
        public CustomerController(ICustomerBL customerBL) 
        {
           _customerBL = customerBL;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "Customer List";
            return View(_customerBL.GetAllData());  
        }

        public IActionResult Create() 
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Customers customer)
        {
            if (ModelState.IsValid) 
            {
                _customerBL.Create(customer);
                RedirectToAction("Index");
            }

            return View(customer);
        }

        public IActionResult GetData(int id)
        {
            return View(_customerBL.GetData(id));
        }

        [HttpPost]
        public IActionResult Edit(Customers customer)
        {
            if (ModelState.IsValid)
            {
                var res=_customerBL.Edit(customer);
                if (res.Status== Status.Success)
                   RedirectToAction("Index");
                else
                    return View(customer);

            }
            return View(customer);

        }

    }
}

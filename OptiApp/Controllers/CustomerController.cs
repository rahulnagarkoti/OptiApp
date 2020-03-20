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
            return PartialView(_customerBL.GetAllData());
        }

        public IActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<DataResult> Create(Customers customer)
        {
            if (ModelState.IsValid)
            {
                var result = await _customerBL.Create(customer);
                return result;
            }

            return new DataResult() { Status = Status.Failed, Message = "" };
        }

        public async Task<IActionResult> Edit(int id)
        {
            var data = await _customerBL.GetData(id);
            return PartialView(data);
        }

        [HttpPost]
        public async Task<DataResult> Edit(Customers customer)
        {
            if (ModelState.IsValid)
            {
                var res = await _customerBL.Edit(customer);
                return res;

            }
            return new DataResult { Status = Status.Failed, Message = "All fields are required!!" };

        }

        public async Task<IActionResult> Details(int id)
        {
            var data = await _customerBL.GetData(id);

            return PartialView("Details", data);
        }

        public async Task<IEnumerable<Customers>> GetAllData()
        {
            return await _customerBL.GetAllData();
        }

        public async Task<IActionResult> DeleteView(int id)
        {
            var data = await _customerBL.GetData(id);

            return PartialView("Details", data);
        }

        [HttpPost]
        public async Task<DataResult> Delete(int id)
        {
            var result = await _customerBL.Delete(id);
            return result;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuisnessLayer.Interface;
using DataLayer.ViewModels;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OptiApp.Controllers
{
    public class OrderController : Controller
    {

        public readonly IOrderBL _orderBL;
        public OrderController(IOrderBL orderBL) 
        {
            _orderBL = orderBL;
        }

        public IActionResult Index()
        {
            ViewBag.Title = "Order List";
            return PartialView(_orderBL.GetAllData());
        }

        public IActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<DataResult> Create(OrderViewModel Order)
        {
            if (ModelState.IsValid)
            {
                var result = await _orderBL.Create(Order);
                return result;
            }

            return new DataResult() { Status = Status.Failed, Message = "" };
        }

        public async Task<IActionResult> Edit(int id)
        {
            var data = await _orderBL.GetData(id);
            return PartialView(data);
        }

        [HttpPost]
        public async Task<DataResult> Edit(OrderViewModel Order)
        {
            if (ModelState.IsValid)
            {
                var res = await _orderBL.Edit(Order);
                return res;

            }
            return new DataResult { Status = Status.Failed, Message = "All fields are required!!" };

        }

        public async Task<IActionResult> Details(int id)
        {
            var data = await _orderBL.GetData(id);

            return PartialView("Details", data);
        }

        public async Task<IEnumerable<OrderViewModel>> GetAllData()
        {
            return await _orderBL.GetAllData();
        }
    }
}

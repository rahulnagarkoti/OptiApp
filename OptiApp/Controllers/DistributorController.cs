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
    public class DistributorController : Controller
    {
        private readonly IDistributorBL _DistributorBL;
        public DistributorController(IDistributorBL DistributorBL)
        {
            _DistributorBL = DistributorBL;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "Distributor List";
            return PartialView(_DistributorBL.GetAllData());
        }

        public IActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<DataResult> Create(Distributors Distributor)
        {
            if (ModelState.IsValid)
            {
                var result = await _DistributorBL.Create(Distributor);
                return result;
            }

            return new DataResult() { Status = Status.Failed, Message = "" };
        }

        public async Task<IActionResult> Edit(int id)
        {
            var data = await _DistributorBL.GetData(id);
            return PartialView(data);
        }

        [HttpPost]
        public async Task<DataResult> Edit(Distributors Distributor)
        {
            if (ModelState.IsValid)
            {
                var res = await _DistributorBL.Edit(Distributor);
                return res;

            }
            return new DataResult { Status = Status.Failed, Message = "All fields are required!!" };

        }

        public async Task<IActionResult> Details(int id)
        {
            var data = await _DistributorBL.GetData(id);

            return PartialView("Details", data);
        }

        public async Task<IEnumerable<Distributors>> GetAllData()
        {
            return await _DistributorBL.GetAllData();
        }

        public async Task<IActionResult> DeleteView(int id)
        {
            var data = await _DistributorBL.GetData(id);

            return PartialView("Details", data);
        }

        [HttpPost]
        public async Task<DataResult> Delete(int id)
        {
            var result = await _DistributorBL.Delete(id);
            return result;
        }

    }
}

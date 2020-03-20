using BuisnessLayer.Interface;
using DataLayer.Models;
using DataLayer.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OptiApp.Controllers
{
    public class DoctorController:Controller
    {
        private readonly IDoctorBL _DoctorBL;
        public DoctorController(IDoctorBL DoctorBL)
        {
            _DoctorBL = DoctorBL;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "Doctor List";
            return PartialView(_DoctorBL.GetAllData());
        }

        public IActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<DataResult> Create(Doctors Doctor)
        {
            if (ModelState.IsValid)
            {
                var result = await _DoctorBL.Create(Doctor);
                return result;
            }

            return new DataResult() { Status = Status.Failed, Message = "" };
        }

        public async Task<IActionResult> Edit(int id)
        {
            var data = await _DoctorBL.GetData(id);
            return PartialView(data);
        }

        [HttpPost]
        public async Task<DataResult> Edit(Doctors Doctor)
        {
            if (ModelState.IsValid)
            {
                var res = await _DoctorBL.Edit(Doctor);
                return res;

            }
            return new DataResult { Status = Status.Failed, Message = "All fields are required!!" };

        }

        public async Task<IActionResult> Details(int id)
        {
            var data = await _DoctorBL.GetData(id);

            return PartialView("Details", data);
        }

        public async Task<IEnumerable<Doctors>> GetAllData()
        {
            return await _DoctorBL.GetAllData();
        }

        public async Task<IActionResult> DeleteView(int id)
        {
            var data = await _DoctorBL.GetData(id);

            return PartialView("Details", data);
        }

        [HttpPost]
        public async Task<DataResult> Delete(int id)
        {
            var result = await _DoctorBL.Delete(id);
            return result;
        }
    }
}

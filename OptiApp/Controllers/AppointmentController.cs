using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuisnessLayer.Interface;
using DataLayer.Models;
using DataLayer.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace OptiApp.Controllers
{
    public class AppointmentController : Controller
    {
        private readonly IAppointmentBL _appointmentBL;
        public AppointmentController(IAppointmentBL appointmentBL)
        {
            _appointmentBL = appointmentBL;
        }
        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "appointment List";
            return PartialView(_appointmentBL.GetAllData());
        }

        public IActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<DataResult> Create(Appointments appointment)
        {
            if (ModelState.IsValid)
            {
                var result = await _appointmentBL.Create(appointment);
                return result;
            }

            return new DataResult() { Status = Status.Failed, Message = "" };
        }

        public async Task<IActionResult> Details(int id)
        {
            var data = await _appointmentBL.GetData(id);

            return PartialView("Details", data);
        }

        public async Task<IEnumerable<Appointments>> GetAllData()
        {
            return await _appointmentBL.GetAllData();
        }

        public async Task<IActionResult> DeleteView(int id)
        {
            var data = await _appointmentBL.GetData(id);

            return PartialView("Details", data);
        }

        [HttpPost]
        public async Task<DataResult> Delete(int id)
        {
            var result = await _appointmentBL.Delete(id);
            return result;
        }

    }
}

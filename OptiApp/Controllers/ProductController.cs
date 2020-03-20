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
    public class ProductController : Controller
    {
        private readonly IProductBL _productBL;
        public ProductController(IProductBL productBL)
        {
            _productBL = productBL;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            ViewBag.Title = "Products List";
            return PartialView(_productBL.GetAllData());
        }

        public IActionResult Create()
        {
            return PartialView();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductViewModel product)
        {
            if (ModelState.IsValid)
            {
                await _productBL.Create(product);
                RedirectToAction("Index");
            }

            return PartialView(product);
        }

        public async Task<IActionResult> GetData(int id)
        {
            var data = _productBL.GetData(id);
            return PartialView(data);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(ProductViewModel product)
        {
            if (ModelState.IsValid)
            {
                var res = await _productBL.Edit(product);
                if (res.Status == Status.Success)
                    RedirectToAction("Index");
                else
                    return PartialView(product);

            }
            return PartialView(product);

        }

        public IActionResult Details()
        {
            return PartialView();
        }
        public async Task<IEnumerable<ProductViewModel>> GetAllData()
        {
            return await _productBL.GetAllData();
        }


    }
}

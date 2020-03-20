using BuisnessLayer.Interface;
using DataLayer;
using DataLayer.Models;
using DataLayer.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Classes
{
    public class OrderBL : IOrderBL
    {
        private readonly ApplicationDbContext _context;
        DataResult result;

        public OrderBL(ApplicationDbContext context)
        {
            _context = context;
            result = new DataResult() { Status = Status.Success };

        }
        public async Task<DataResult> Create(OrderViewModel data)
        {
            try
            {
                //validate existing orders

                //var check = await _context.Order.FirstOrDefaultAsync();
                //if (check != null)
                //{
                //    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                //}

                var model = new Order
                {
                    CustomerId = data.CustomerId,
                    OrderDate = DateTime.Now,
                    Details = data.DetailsVM.Select(x => new Details
                    {
                        AdvanceAmount = x.AdvanceAmount,
                        ProductId = x.ProductId,
                        Quantity = x.Quantity,
                        TotalAmount = x.TotalAmount,
                        DeliveryDate = x.DeliveryDate
                    }).ToList()
                };

                _context.Order.Add(model);
                await _context.SaveChangesAsync();
                return result;

            }
            catch (Exception e)
            {
                result.Status = Status.Failed;
                result.Message = e.Message;
                return result;
            }

        }

        public async Task<DataResult> Edit(OrderViewModel data)
        {
            try
            {
                var existingData = await _context.Order.Where(x => x.Id == data.Id).AsNoTracking().FirstOrDefaultAsync();
                if (existingData == null)
                {
                    result.Status = Status.Failed;
                    result.Message = "Data not found !!";
                    return result;
                }
                //var check = await _context.Order.Where(x => x.Id != data.Id && x.Name == data.Name ).AsNoTracking().FirstOrDefaultAsync();
                //if (check != null)
                //{
                //    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                //}

                var model = new Order
                {
                    CustomerId = data.CustomerId,
                    OrderDate = DateTime.Now,
                    Details = data.DetailsVM.Select(x => new Details
                    {
                        AdvanceAmount = x.AdvanceAmount,
                        ProductId = x.ProductId,
                        Quantity = x.Quantity,
                        TotalAmount = x.TotalAmount,
                        DeliveryDate = x.DeliveryDate
                    }).ToList()
                };
                _context.Order.Update(model);
                await _context.SaveChangesAsync();
                return result;

            }
            catch (Exception e)
            {
                result.Status = Status.Failed;
                result.Message = e.Message;
                return result;
            }
        }

        public async Task<IEnumerable<OrderViewModel>> GetAllData()
        {
            var data = await _context.Order.AsNoTracking().ToListAsync();
            return data.Select(x => new OrderViewModel()
            {
                CustomerId = x.CustomerId,
                OrderDate = x.OrderDate,

            });
        }

        public async Task<OrderViewModel> GetData(int Id)
        {
            var data = await _context.Order.Where(x => x.Id == Id).Include(c => c.Customer).AsNoTracking().Include(y => y.Details).ThenInclude(x => x.Products).ToListAsync();
            return data.Select(x => new OrderViewModel()
            {
                CustomerId = x.CustomerId,
                CustomerName = x.Customer.Name,
                OrderDate = x.OrderDate,
                DetailsVM = x.Details.Select(z => new DetailsVM
                {
                    AdvanceAmount = z.AdvanceAmount,
                    DeliveryDate = z.DeliveryDate,
                    OrderId = z.OrderId,
                    ProductId = z.ProductId,
                    Quantity = z.Quantity,
                    ProductName = z.Products.Name,
                    TotalAmount = z.TotalAmount,
                }).ToList(),

            }).FirstOrDefault();
        }
    }
}


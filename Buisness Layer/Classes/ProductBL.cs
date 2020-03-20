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
    public class ProductBL : IProductBL
    {

        private readonly ApplicationDbContext _context;
        DataResult result;
        public ProductBL(ApplicationDbContext context)
        {
            _context = context;
            result = new DataResult() { Status = Status.Success };
        }

        public async Task<DataResult> Create(ProductViewModel data)
        {
            //async await??

            try
            {
                var check = await _context.Products.Where(x => x.Name == data.Name).FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }

                var model = new Products 
                {   
                    DistributorId=data.DistributorId,
                    CostPrice=data.CostPrice,
                    Name=data.Name,
                    StockCount=data.StockCount,                    
                };

                _context.Products.Add(model);
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

        public async Task<DataResult> Delete(int Id)
        {
            try
            {
                var data = await _context.Products.Where(x => x.Id == Id).FirstOrDefaultAsync();
                if (data == null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Data not found !" };
                }
                _context.Remove(data);
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

        public async Task<DataResult> Edit(ProductViewModel data)
        {
            try
            {
                var existingData = await _context.Products.Where(x => x.Id == data.Id).FirstOrDefaultAsync();
                if (existingData == null)
                {
                    result.Status = Status.Failed;
                    result.Message = "Data not found !!";
                    return result;
                }
                var check = await _context.Products.Where(x => x.Id != data.Id && x.Name == data.Name ).FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }

                existingData.CostPrice = data.CostPrice;
                existingData.Name = data.Name;
                existingData.StockCount = data.StockCount;
                existingData.DistributorId = data.DistributorId;
                
                _context.Products.Update(existingData);
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

        public async Task<IEnumerable<ProductViewModel>> GetAllData()
        {
            var model= await _context.Products.Include(x=>x.Distributor).ToListAsync();
            return model.Select(x=> new ProductViewModel() 
            { 
                CostPrice=x.CostPrice,
                DistributorId = x.DistributorId,
                DistributorName =x.Distributor.Name,
                Name=x.Name,StockCount=x.StockCount
            }).ToList();
        }

        public ProductViewModel GetData(int Id)
        {
            var model= _context.Products.Where(x => x.Id == Id).Include(x=>x.Distributor).FirstOrDefault();
            return new ProductViewModel 
            {
                Name=model.Name,
                CostPrice=model.CostPrice,
                DistributorId = model.DistributorId,
                StockCount =model.StockCount,
                DistributorName=model.Distributor.Name,
                Id=model.Id
                
            };
        }
    }

}

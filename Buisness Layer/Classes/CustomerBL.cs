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
    public class CustomerBL : ICustomerBL
    {

        private readonly ApplicationDbContext _context;
        DataResult result;
        public CustomerBL(ApplicationDbContext context)
        {
            _context = context;
            result = new DataResult() { Status = Status.Success };
        }

        public async Task<DataResult> Create(Customers data)
        {
            //async await??

            try
            {
                var check = await _context.Customers.Where(x => x.Name == data.Name && x.DOB == data.DOB &&
                                                      x.ContactNumber == data.ContactNumber && x.Gender == data.Gender).FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }

                _context.Customers.Add(data);
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
                var data = await _context.Customers.Where(x => x.Id == Id).FirstOrDefaultAsync();
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

        public async Task<DataResult> Edit(Customers data)
        {
            try
            {
                var existingData = await _context.Customers.Where(x => x.Id == data.Id).AsNoTracking().FirstOrDefaultAsync();
                if (existingData == null)
                {
                    result.Status = Status.Failed;
                    result.Message = "Data not found !!";
                    return result;
                }
                var check = await _context.Customers.Where(x => x.Id != data.Id && x.Name == data.Name && x.DOB == data.DOB &&
                                                      x.ContactNumber == data.ContactNumber && x.Gender == data.Gender).AsNoTracking().FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }
                _context.Customers.Update(data);
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

        public async Task<IEnumerable<Customers>> GetAllData()
        {
            return await _context.Customers.AsNoTracking().ToListAsync();
        }

        public async Task<Customers> GetData(int Id)
        {
            return await _context.Customers.Where(x => x.Id == Id).AsNoTracking().FirstOrDefaultAsync();
        }
    }

}

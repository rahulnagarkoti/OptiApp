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
    public class DoctorBL : IDoctorBL
    {
        private readonly ApplicationDbContext _context; 
        DataResult result;

        public DoctorBL(ApplicationDbContext context) 
        {
            _context = context; 
            result = new DataResult() { Status = Status.Success };

        }
        public async Task<DataResult> Create(Doctors data)
        {
            //async await??

            try
            {
                var check = await _context.Doctors.Where(x => x.Name == data.Name).FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }

                _context.Doctors.Add(data);
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
                var data = await _context.Doctors.Where(x => x.Id == Id).FirstOrDefaultAsync();
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

        public async Task<DataResult> Edit(Doctors data)
        {
            try
            {
                var existingData = await _context.Doctors.Where(x => x.Id == data.Id).AsNoTracking().FirstOrDefaultAsync();
                if (existingData == null)
                {
                    result.Status = Status.Failed;
                    result.Message = "Data not found !!";
                    return result;
                }
                var check = await _context.Doctors.Where(x => x.Id != data.Id && x.Name == data.Name ).AsNoTracking().FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }
                _context.Doctors.Update(data);
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

        public async Task<IEnumerable<Doctors>> GetAllData()
        {
            return await _context.Doctors.AsNoTracking().ToListAsync();
        }

        public async Task<Doctors> GetData(int Id)
        {
            return await _context.Doctors.Where(x => x.Id == Id).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}


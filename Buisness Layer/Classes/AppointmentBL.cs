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
    public class AppointmentBL:IAppointmentBL
    {
        private readonly ApplicationDbContext _context;
        DataResult result;
        public AppointmentBL(ApplicationDbContext context)
        {
            _context = context;
            result = new DataResult() { Status = Status.Success };
        }

        public async Task<DataResult> Create(Appointments data)
        {
            //async await??

            try
            {
                var check = await _context.Appointments.FirstOrDefaultAsync();
                if (check != null)
                {
                    return new DataResult() { Status = Status.Failed, Message = "Duplicate data found!!" };
                }

                _context.Appointments.Add(data);
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
                var data = await _context.Appointments.Where(x => x.Id == Id).FirstOrDefaultAsync();
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

        public async Task<IEnumerable<Appointments>> GetAllData()
        {
            return await _context.Appointments.AsNoTracking().ToListAsync();
        }

        public async Task<Appointments> GetData(int Id)
        {
            return await _context.Appointments.Where(x => x.Id == Id).AsNoTracking().FirstOrDefaultAsync();
        }
    }
}

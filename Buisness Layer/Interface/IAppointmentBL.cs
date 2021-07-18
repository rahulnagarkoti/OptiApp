using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Interface
{
    public interface IAppointmentBL
    {
        Task<IEnumerable<Appointments>> GetAllData();
        Task<DataResult> Delete(int Id);
        Task<Appointments> GetData(int Id);
        Task<DataResult> Create(Appointments data);
    }
}

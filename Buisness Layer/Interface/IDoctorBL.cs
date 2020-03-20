using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Interface
{
    public interface IDoctorBL
    {
        Task<IEnumerable<Doctors>> GetAllData();
        Task<Doctors> GetData(int Id);
        Task<DataResult> Create(Doctors data);
        Task<DataResult> Edit(Doctors data);
        Task<DataResult> Delete(int Id);
    }
}

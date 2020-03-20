using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Interface
{
    public interface IDistributorBL
    {
        Task<IEnumerable<Distributors>> GetAllData();
        Task<Distributors> GetData(int Id);
        Task<DataResult> Create(Distributors data);
        Task<DataResult> Edit(Distributors data);
        Task<DataResult> Delete(int Id);
    }
}

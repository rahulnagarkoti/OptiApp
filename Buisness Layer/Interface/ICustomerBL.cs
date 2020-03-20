using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Interface
{
    public interface ICustomerBL
    {
        Task<IEnumerable<Customers>> GetAllData();
        Task<Customers> GetData(int Id);
        Task<DataResult> Create(Customers data);
        Task<DataResult> Edit(Customers data);
        Task<DataResult> Delete(int Id);
    }
}

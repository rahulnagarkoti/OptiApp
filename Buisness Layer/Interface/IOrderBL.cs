using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Interface
{
    public interface IOrderBL
    {
        Task<IEnumerable<OrderViewModel>> GetAllData();
        Task<DataResult> Create(OrderViewModel data);
        Task<DataResult> Edit(OrderViewModel data);
        Task<OrderViewModel> GetData(int id);

    }
}

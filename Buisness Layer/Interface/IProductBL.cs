using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Interface
{
    public interface IProductBL
    {
        Task<IEnumerable<ProductViewModel>> GetAllData();
        ProductViewModel GetData(int Id);
        Task<DataResult> Create(ProductViewModel data);
        Task<DataResult> Edit(ProductViewModel data);
        Task<DataResult> Delete(int Id);
    }
}

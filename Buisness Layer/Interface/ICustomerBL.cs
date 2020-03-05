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
        IEnumerable<Customers> GetAllData();
        Customers GetData(int Id);
        DataResult Create(Customers data);
        DataResult Edit(Customers data);
        DataResult Delete(int Id);
    }
}

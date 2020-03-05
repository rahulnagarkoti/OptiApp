using BuisnessLayer.Interface;
using DataLayer;
using DataLayer.Models;
using DataLayer.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.Classes
{
    public class CustomerBL:ICustomerBL
    {

        private readonly ApplicationDbContext _context;
        DataResult result;
        public CustomerBL(ApplicationDbContext context)        
        {
            _context = context;
             result = new DataResult() { Status=Status.Success};
        }

        public DataResult Create(Customers data)
        {
            //async await??

            try
            {
                _context.Customers.Add(data);
                _context.SaveChangesAsync();
                return result;

            }
            catch (Exception e)
            {
                result.Status = Status.Failed;
                result.Message = e.Message;
                return result;
            }          

        }

        public DataResult Delete(int Id)
        {
            try
            {
                var data=_context.Customers.Where(x => x.Id == Id);
                _context.Remove(data);
                _context.SaveChanges();
                return result;
            }
            catch (Exception e)
            {
                result.Status = Status.Failed;
                result.Message = e.Message;
                return result;
            }

        }

        public DataResult Edit(Customers data)
        {
            try
            {
                var existingData = _context.Customers.Where(x => x.Id == data.Id);
                if(existingData == null)
                {
                    result.Status = Status.Failed;
                    result.Message = "Data not found !!";
                    return result;
                }
                _context.Customers.Update(data);
                _context.SaveChanges();
                return result;

            }
            catch (Exception e)
            {
                result.Status = Status.Failed;
                result.Message = e.Message;
                return result;
            }
        }

        public IEnumerable<Customers> GetAllData()
        {
            return _context.Customers.ToList();
        }

        public Customers GetData(int Id)
        {
            return _context.Customers.Where(x=>x.Id==Id).FirstOrDefault();
        }
    }

    }

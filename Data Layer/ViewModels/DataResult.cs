using System;
using System.Collections.Generic;
using System.Text;

namespace DataLayer.ViewModels
{
    public class DataResult
    {
        public Status Status { get; set; }
        public string Message { get; set; }

    }

    public enum Status 
    {
        Failed = 0,
        Success = 1
    }
}

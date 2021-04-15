using Domain.DTOs.Files;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Files
{
    public interface IFileManager
    {
        CreateFileDTO[] Save();
        Task<IActionResult> Download(String url);
    }
}

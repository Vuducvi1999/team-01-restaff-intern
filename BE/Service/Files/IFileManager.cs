using Domain.DTOs.Files;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Service.Files
{
    public interface IFileManager
    {
        Task<List<FileDTO>> Save(List<CreateFileDTO> files);
        Task<FileStreamResult> Download(String url);
    }
}

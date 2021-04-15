using Common.Constants;
using Domain.DTOs.Files;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Service.Files
{
    public class FileManager : IFileManager
    {
        public async Task<FileStreamResult> Download(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), url);
            if (!System.IO.File.Exists(filePath))
                return null;
            var memory = new MemoryStream();
            await using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return new FileStreamResult(memory, GetContentType(filePath));
        }

        private string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;

            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }

            return contentType;
        }

        public async Task<List<FileDTO>> Save(List<CreateFileDTO> files)
        {
            IActionResult result;
            List<String> urls = new List<string>();
            var filePaths = UrlConstants.BaseLocalUrlFile;
            var urlPath = UrlConstants.BaseCloudUrlFile;
            if (!Directory.Exists(filePaths))
            {
                //Directory.Delete(filePath, true);
                Directory.CreateDirectory(filePaths);
            }
            if (files != null && files.Count > 0)
            {
                foreach (var file in files)
                {
                    var formFile = file.File;
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(formFile.FileName);
                    string filePath = Path.Combine(filePaths, fileName);
                    if (formFile.Length > 0)
                    {
                        using (var stream = System.IO.File.Create(filePath))
                        {
                            //stream.Write();
                            await formFile.CopyToAsync(stream);

                            urls.Add(Path.Combine(urlPath, fileName));
                        }
                    }
                }
            }
            result = CommonResponse(0, urls);
            return result;
        }
    }
}

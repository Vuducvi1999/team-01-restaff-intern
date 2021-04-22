using AutoMapper;
using Common.Constants;
using Domain.DTOs.Files;
using Infrastructure.Extensions;
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
        private readonly IMapper _mapper;

        public FileManager(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<FileStreamResult> DownloadFile(string url)
        {
            var memory = new MemoryStream();
            if (url.IsNullOrEmpty())
            {
                return new FileStreamResult(memory, "application/octet-stream");
            }
            var filePath = Path.Combine(UrlConstants.BaseLocalUrlFile, Path.GetFileName(url));

            if (!System.IO.File.Exists(filePath))
            {
                return new FileStreamResult(memory, "application/octet-stream");
            }

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

        public async Task<List<CreateFileDTO>> SaveFile(SaveFileDTO saveFile)
        {
            var filePaths = UrlConstants.BaseLocalUrlFile;
            //var urlPath = UrlConstants.BaseCloudUrlFile;
            List<CreateFileDTO> createFileDTOs = new List<CreateFileDTO>();
            if (!Directory.Exists(filePaths))
            {
                //Directory.Delete(filePath, true);
                Directory.CreateDirectory(filePaths);
            }
            if (saveFile.Files != null && saveFile.Files.Count > 0)
            {
                foreach (var formFile in saveFile.Files)
                {
                    var ext = Path.GetExtension(formFile.FileName);
                    if(!DataType.CheckTypeAccept(saveFile.EntityType, ext))
                    {
                        continue;
                    }
                    var fileName = Guid.NewGuid().ToString() + ext;
                    var filePath = Path.Combine(filePaths, fileName);

                    var item = _mapper.Map<SaveFileDTO, CreateFileDTO>(saveFile);
                    if (formFile.Length > 0)
                    {
                        using (var stream = System.IO.File.Create(filePath))
                        {
                            //stream.Write();
                            await formFile.CopyToAsync(stream);

                            //item.Url = Path.Combine(urlPath, fileName);
                            item.Url = fileName;
                            item.Name = formFile.FileName;
                            item.FileExt = ext;
                        }
                        createFileDTOs.Add(item);
                    }
                }
            }


            return createFileDTOs;
        }
    }
}

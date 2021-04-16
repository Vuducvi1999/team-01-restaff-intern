using Common.Constants;
using Common.Http;
using Common.Pagination;
using Domain.DTOs.Files;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BE.Controllers
{
    [Route(UrlConstants.BaseFile)]
    [ApiController]
    public class FileController : BaseController
    {
        private readonly IFileManager _fileManager;
        private readonly IFileService _fileService;
        public FileController(IAuthService authService, IUserManager userManager, IFileService fileService, IFileManager fileManager) : base(authService, userManager)
        {
            _fileService = fileService;
            _fileManager = fileManager;
        }

        [HttpGet]
        public IActionResult GetFile([FromQuery] SerachPaginationDTO<FileDTO> serachPagination)
        {
            var result = _fileService.SearchPagination(serachPagination);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.BaseFileGetType)]
        public IActionResult GetFileType()
        {
            var result = EnityType.ToArray();
            return CommonResponse(new ReturnMessage<KeyValuePair<string,string>[]>(false, result, MessageConstants.SearchSuccess));
        }

        [HttpPost]
        public async Task<IActionResult> SaveFile([FromForm] SaveFileDTO dto)
        {

            if (!EnityType.ContainsKey(dto.EntityType))
            {
                return CommonResponse(new ReturnMessage<List<FileDTO>>(true, null, MessageConstants.EnityTypeError));
            }
            dto.EntityType = EnityType[dto.EntityType];

            var saveFiles = await _fileManager.SaveFile(dto);
            if (saveFiles.Count <= 0)
            {
                return CommonResponse(new ReturnMessage<List<FileDTO>>(true, null, MessageConstants.Error));
            }
            var result = _fileService.Create(saveFiles);
            return CommonResponse(result);
        }

        [HttpGet(UrlConstants.BaseFileDownload)]
        public async Task<FileStreamResult> DownloadFile([FromQuery] string url)
        {
            var fileDownload = await _fileManager.DownloadFile(url);
            return fileDownload;
        }

    }
}

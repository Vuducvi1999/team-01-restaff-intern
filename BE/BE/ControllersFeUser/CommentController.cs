﻿using BE.Controllers;
using Common.Constants;
using Common.Pagination;
using Domain.DTOs.Comments;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Comments;
using Service.Contacts;
using Service.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.ControllersFeUser
{
    [Route(UrlConstants.BaseComment)]
    [ApiController]
    public class CommentController: BaseController
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _commentService.GetAll();
            return CommonResponse(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CreateCommentDTO model)
        {

            var result = _commentService.Create(model);
            return CommonResponse(result);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] DeleteCommentDTO model)
        {
            var result = _commentService.Delete(model);
            return CommonResponse(result);
        }
    }
}
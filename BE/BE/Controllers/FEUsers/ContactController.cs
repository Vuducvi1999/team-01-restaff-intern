﻿using BE.Controllers;
using Common.Constants;
using Domain.DTOs.Contact;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Auth;
using Service.Contacts;
using Service.Files;
using Service.Home;
using System.Collections.Generic;

namespace BE.FeUserControllers.FEUsers
{
    [Route(UrlConstants.BaseContact)]
    [ApiController]
    public class ContactController : BaseController
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService, IAuthService authService, IUserManager userManager, IFileService fileService) : base(authService, userManager, fileService)
        {
            _contactService = contactService;
        }


        [HttpPost]
        public IActionResult Post([FromBody] CreateContactDTO model)
        {

            var result = _contactService.Create(model);
            return CommonResponse(result);
        }
    }
}

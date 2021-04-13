﻿using Domain.DTOs.User;
using Infrastructure.Auth;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Service.Auth
{
    public class JwtManager : IJwtManager
    {
        private readonly JwtTokenConfig _jwtTokenConfig;
        private readonly byte[] _secret;

        public JwtManager(JwtTokenConfig jwtTokenConfig) {
            _jwtTokenConfig = jwtTokenConfig;
            _secret = Encoding.ASCII.GetBytes(jwtTokenConfig.Secret); // Secret key
        }

        public UserDecompileDTO DecompileToken(string token)
        {
            var stream = token;
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(stream);
            var tokenS = jsonToken as JwtSecurityToken;
            var data = new UserDecompileDTO()
            {
                Id = Guid.Parse(tokenS.Claims.First(claim => claim.Type == ClaimTypes.NameIdentifier).Value),
                Username = tokenS.Claims.First(claim => claim.Type == ClaimTypes.UserData).Value,
            };
            return data;
        }

        public string GenerateToken(IEnumerable<Claim> claims, DateTime now)
        {
            // Setup JWT generate parameters
            var jwtToken = new JwtSecurityToken(
                issuer: _jwtTokenConfig.Issuer,
                audience: _jwtTokenConfig.Audience,
                claims: claims,
                notBefore: now,
                //expires: now.AddMinutes(_jwtTokenConfig.ExpirationMinutes),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(_secret), SecurityAlgorithms.HmacSha256Signature));
            var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return accessToken;
        }
    }
}

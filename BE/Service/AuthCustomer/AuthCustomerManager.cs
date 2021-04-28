using AutoMapper;
using Domain.DTOs.Customer;
using Infrastructure.Auth;
using Infrastructure.EntityFramework;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Service.AuthCustomer
{
    public class AuthCustomerManager : IAuthCustomerManager
    {
        private IRepository<Domain.Entities.User> _repository;
        private IMapper _mapper;
        private readonly JwtTokenConfig _jwtTokenConfig;
        private readonly byte[] _secret;

        public AuthCustomerManager(JwtTokenConfig jwtTokenConfig, IMapper mapper, IRepository<Domain.Entities.User> repository)
        {
            _jwtTokenConfig = jwtTokenConfig;
            _secret = Encoding.ASCII.GetBytes(jwtTokenConfig.Secret); // Secret key
            _mapper = mapper;
            _repository = repository;
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

        public CustomerDataReturnDTO GetInformationAuth(Guid id)
        {
            try
            {
                var data = _repository.Find(id);
                var result = _mapper.Map<Domain.Entities.User, CustomerDataReturnDTO>(data);
                return result;
            }
            catch (Exception ex)
            {
                return new CustomerDataReturnDTO();
            }
        }
    }
}

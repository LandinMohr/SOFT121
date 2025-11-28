using System;
using Microsoft.AspNetCore.Mvc;
using SOFT121.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace SOFT121.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly string _connectionString;
        public UserController(IConfiguration configuration)
        {
            var connStr = configuration.GetConnectionString("DefaultConnection");
            if (string.IsNullOrWhiteSpace(connStr))
            {
                throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");
            }
            _connectionString = connStr;
        }

        // POST api/user/register
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                string query = @"INSERT INTO Users (Email, Password, FirstName, LastName)
                                 VALUES (@Email, @Password, @FirstName, @LastName)";

                SqlCommand cmd = new SqlCommand(query, conn);

                cmd.Parameters.AddWithValue("@Email", user.Email);
                cmd.Parameters.AddWithValue("@Password", user.PasswordHash);  // plain password for now (school assignment)
                cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                cmd.Parameters.AddWithValue("@LastName", user.LastName);

                cmd.ExecuteNonQuery();
            }

            return Ok(new { message = "User registered successfully" });
        }
    }
}

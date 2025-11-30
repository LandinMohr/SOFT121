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

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    string query = @"INSERT INTO dbo.Users (Username,Email, PasswordHash, FirstName, LastName)
                                     VALUES (@Username, @Email, @PasswordHash, @FirstName, @LastName)";

                    SqlCommand cmd = new SqlCommand(query, conn);
                    cmd.Parameters.AddWithValue("@Username", user.Username);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@PasswordHash", user.PasswordHash);

                    cmd.Parameters.AddWithValue("@FirstName", user.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", user.LastName);

                    cmd.ExecuteNonQuery();
                }

                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}

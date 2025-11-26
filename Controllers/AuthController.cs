using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using SOFT121.Data;
using SOFT121.Models;

namespace SOFT121.Controllers;
{
    [ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly MyDbContext _context;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthController(MyDbContext context, IPasswordHasher<User> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        var existingUser = _context.Users.SingleOrDefault(u => u.Email == request.Email);
        if (existingUser != null)
        {
            return BadRequest("Email already in use.");
        }
        var user = new User
        {
            Email = request.Email,
            FirstName = request.FirstName,
            LastName = request.LastName
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);
        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok("User registered successfully.");

    }
}
}

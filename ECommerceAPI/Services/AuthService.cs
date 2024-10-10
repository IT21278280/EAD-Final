using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ECommerceAPI.Models;
using MongoDB.Driver;
using BC = BCrypt.Net.BCrypt;

namespace ECommerceAPI.Services
{
    public class AuthService
    {
        private readonly IMongoCollection<User> _userCollection;
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;

            try
            {
                var settings = MongoClientSettings.FromConnectionString(_configuration.GetConnectionString("MongoDb"));
                settings.ServerSelectionTimeout = TimeSpan.FromSeconds(30);
                var mongoClient = new MongoClient(settings);
                var database = mongoClient.GetDatabase("EAD");
                _userCollection = database.GetCollection<User>("user");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect to MongoDB: {ex.Message}");
                throw new ApplicationException("MongoDB connection error", ex);
            }
        }

        public async Task<string> AuthenticateAsync(string email, string password)
        {
            var user = await _userCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
            if (user == null || !BC.Verify(password, user.PasswordHash))
            {
                return null; // Invalid credentials
            }

            // Generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("UserId", user.Id)
            }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}

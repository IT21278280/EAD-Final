using ECommerceAPI.Data;
using ECommerceAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using System.Text;

namespace ECommerceAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure MongoDB connection settings
            builder.Services.Configure<DatabaseSettings>(
                builder.Configuration.GetSection("ConnectionStrings"));

            // Register application services
            builder.Services.AddSingleton<UserService>();
            builder.Services.AddSingleton<ProductService>();
            builder.Services.AddSingleton<OrderService>();
            builder.Services.AddSingleton<InventoryService>();
            builder.Services.AddSingleton<VendorService>();
            builder.Services.AddSingleton<NotificationService>();
            builder.Services.AddSingleton<AuthService>();

            // Register MongoDB client
            var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDB");
            builder.Services.AddSingleton<IMongoClient, MongoClient>(sp => new MongoClient(mongoConnectionString));

            // Configure JWT authentication
            var jwtSettings = builder.Configuration.GetSection("JwtSettings");
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]))
                };
            });

            // Add authorization services
            builder.Services.AddAuthorization();

            // Configure CORS policy for front-end (React or other client)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", policy =>
                {
                    policy.WithOrigins("https://your-frontend-url.com") // Replace with your front-end URL
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            builder.Services.AddControllers();

            // Configure Swagger with JWT support
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "E-Commerce API", Version = "v1" });

                // Add JWT Authentication to Swagger
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: 'Bearer {token}'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "E-Commerce API v1"));
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            // Enable CORS policy
            app.UseCors("AllowReactApp");

            // Add authentication and authorization to the pipeline
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            // Serve the default fallback file for client-side apps (e.g., React)
            app.MapFallbackToFile("index.html");

            app.Run();
        }
    }
}

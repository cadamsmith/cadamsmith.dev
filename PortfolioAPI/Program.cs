using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// connect to PostgreSQL database
var connectionString = builder.Configuration.GetConnectionString("PostgreConnection");
builder.Services.AddDbContext<PortfolioEntities>(
    options => options.UseNpgsql(connectionString)
);

// helps capture database-related exceptions and display them for developer
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

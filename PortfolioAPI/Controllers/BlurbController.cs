using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class BlurbController : Controller
{
    private readonly ILogger<BlurbController> _logger;

    public BlurbController(ILogger<BlurbController> logger)
    {
        _logger = logger;
    }
}
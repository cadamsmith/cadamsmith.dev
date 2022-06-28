using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("/api/personalinfo")]
public class PersonalInfoController : ControllerBase
{
    private readonly ILogger<PersonalInfoController> _logger;
    private readonly IPersonalInfoService _personalInfoService;

    public PersonalInfoController(ILogger<PersonalInfoController> logger, IPersonalInfoService personalInfoService)
    {
        _logger = logger;
        _personalInfoService = personalInfoService;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(PersonalInfo), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            bool personalInfoExists = await _personalInfoService.ExistsAsync(cancellationToken);
            if (!personalInfoExists)
            {
                return NotFound();
            }

            var personalInfo = await _personalInfoService.GetAsync(cancellationToken);

            return Ok(personalInfo);
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }

    [HttpPut]
    [ProducesResponseType(typeof(PersonalInfo), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutAsync([FromBody] PersonalInfoBaseData data, CancellationToken cancellationToken = default)
    {
        try
        {
            bool personalInfoExists = await _personalInfoService.ExistsAsync(cancellationToken);
            if (!personalInfoExists)
            {
                return NotFound();
            }

            PersonalInfo personalInfo = await _personalInfoService.UpdateAsync(data, cancellationToken);
            return Ok(personalInfo);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPost]
    [ProducesResponseType(typeof(PersonalInfo), StatusCodes.Status201Created)]
    public async Task<IActionResult> PostAsync([FromBody] PersonalInfoBaseData data, CancellationToken cancellationToken = default)
    {
        try
        {
            PersonalInfo createdPersonalInfo = await _personalInfoService.CreateAsync(data, cancellationToken);
            return CreatedAtAction("Get", new { id = createdPersonalInfo.Id }, createdPersonalInfo);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
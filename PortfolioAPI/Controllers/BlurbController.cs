using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("/api/blurbs")]
public class BlurbController : ControllerBase
{
    private readonly ILogger<BlurbController> _logger;
    private readonly IBlurbService _blurbService;

    public BlurbController(ILogger<BlurbController> logger, IBlurbService blurbService)
    {
        _logger = logger;
        _blurbService = blurbService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Blurb>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            var blurbs = await _blurbService.GetAllAsync(cancellationToken);
            return Ok(blurbs);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Blurb), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetAsync(int id, CancellationToken cancellationToken = default)
    {
        try
        {
            bool blurbExists = await _blurbService.ExistsWithId(id, cancellationToken);
            if (!blurbExists)
            {
                return NotFound();
            }

            var result = await _blurbService.GetByIdAsync(id, cancellationToken);

            return Ok(result);
        }
        catch (InvalidOperationException)
        {
            return NotFound();
        }
    }

    [HttpPost]
    [ProducesResponseType(typeof(Blurb), StatusCodes.Status201Created)]
    public async Task<IActionResult> PostAsync([FromBody] BlurbBaseData data, CancellationToken cancellationToken = default)
    {
        try
        {
            Blurb createdBlurb = await _blurbService.CreateAsync(data, cancellationToken);
            return CreatedAtAction("Get", new { id = createdBlurb.Id }, createdBlurb);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Blurb), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> PutAsync([FromRoute] int id, [FromBody] BlurbBaseData data, CancellationToken cancellationToken = default)
    {
        try
        {
            bool blurbExists = await _blurbService.ExistsWithId(id, cancellationToken);
            if (!blurbExists)
            {
                return NotFound();
            }

            Blurb updatedBlurb = await _blurbService.UpdateAsync(id, data, cancellationToken);
            return Ok(updatedBlurb);
        }
        catch (Exception)
        {
            throw;
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync([FromRoute] int id, CancellationToken cancellationToken = default)
    {
        try
        {
            bool blurbExists = await _blurbService.ExistsWithId(id, cancellationToken);
            if (!blurbExists)
            {
                return NotFound();
            }

            await _blurbService.ArchiveAsync(id, cancellationToken);
            return NoContent();
        }
        catch (Exception)
        {
            throw;
        }
    }
}
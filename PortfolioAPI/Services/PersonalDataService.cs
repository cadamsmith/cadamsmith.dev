using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using PortfolioAPI.Data;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services;

public interface IPersonalInfoService
{
    Task<IEnumerable<PersonalInfo>> GetAllAsync(CancellationToken cancellationToken);
    Task<PersonalInfo> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<PersonalInfo> GetActiveAsync(CancellationToken cancellationToken);
    Task<bool> ExistsWithId(int id, CancellationToken cancellationToken);
    Task<Blurb> CreateAsync(PersonalInfo data, CancellationToken cancellationToken);
    Task<Blurb> UpdateAsync(int id, PersonalInfoBaseData data, CancellationToken cancellationToken);
    Task<Blurb> ActivateAsync(int id, CancellationToken cancellationToken);
    Task ArchiveAsync(int id, CancellationToken cancellationToken);
}

public class PersonalInfoBaseData
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public long PhoneNumber { get; set; }
    [Required]
    public string Address { get; set; }
}
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using PortfolioAPI.Data;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services;

public interface IPersonalInfoService
{
    Task<PersonalInfo> GetAsync(CancellationToken cancellationToken);
    Task<bool> ExistsAsync(CancellationToken cancellationToken);
    Task<PersonalInfo> UpdateAsync(PersonalInfoBaseData data, CancellationToken cancellationToken);
}

public class PersonalInfoService : IPersonalInfoService
{
    private readonly PortfolioEntities _db;

    public PersonalInfoService(PortfolioEntities db)
    {
        _db = db;
    }

    public async Task<PersonalInfo> GetAsync(CancellationToken cancellationToken)
    {
        try
        {
            var personalInfo = await _db.PersonalInfos.OrderBy(p => p.Id).FirstAsync(cancellationToken);

            return personalInfo;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> ExistsAsync(CancellationToken cancellationToken)
    {
        try
        {
            bool personalInfoExists = await _db.PersonalInfos.AnyAsync(cancellationToken);

            return personalInfoExists;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<PersonalInfo> UpdateAsync(PersonalInfoBaseData data, CancellationToken cancellationToken)
    {
        try
        {
            var personalInfo = await GetAsync(cancellationToken);

            personalInfo.FirstName = data.FirstName;
            personalInfo.LastName = data.LastName;
            personalInfo.Email = data.Email;
            personalInfo.PhoneNumber = data.PhoneNumber;
            personalInfo.Address = data.Address;
            personalInfo.UpdateMetadata();

            await _db.SaveChangesAsync(cancellationToken);

            return personalInfo;
        }
        catch (Exception)
        {
            throw;
        }
    }
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

using System.ComponentModel.DataAnnotations;
using PortfolioAPI.Models.Common;

namespace PortfolioAPI.Models;

public class PersonalInfo : BaseEntity
{
    public PersonalInfo() : base()
    {
        IsActive = false;
    }

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

    public bool IsActive { get; set; }
}
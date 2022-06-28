using System.ComponentModel.DataAnnotations;
using PortfolioAPI.Models.Common;

namespace PortfolioAPI.Models;

public class Blurb : BaseEntity
{
    public Blurb() : base() {}

    [Required]
    public string Name { get; set; }
    [Required]
    public string Content { get; set; }
}
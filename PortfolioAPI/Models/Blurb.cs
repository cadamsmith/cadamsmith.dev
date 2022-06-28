using System.ComponentModel.DataAnnotations;
using PortfolioAPI.Models.Common;

namespace PortfolioAPI.Models;

public class Blurb : BaseEntity
{
    public Blurb(string name, string content) : base()
    {
        Name = name;
        Content = content;
    }

    [Required]
    public string Name { get; set; }
    [Required]
    public string Content { get; set; }
}
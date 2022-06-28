using PortfolioAPI.Models.Common;

namespace PortfolioAPI.Models;

public class Blurb : BaseEntity
{
    public string Name { get; set; }
    public string Content { get; set; }
}
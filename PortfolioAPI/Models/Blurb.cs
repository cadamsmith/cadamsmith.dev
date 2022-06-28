using PortfolioAPI.Models.Common;

namespace PortfolioAPI.Models;

public class Blurb : BaseEntity
{
    public Blurb(string name, string content) : base()
    {
        Name = name;
        Content = content;
    }

    public string Name { get; set; }
    public string Content { get; set; }
}
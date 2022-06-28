using Microsoft.EntityFrameworkCore;

namespace PortfolioAPI.Models;

public class PortfolioEntities : DbContext
{
    public PortfolioEntities(DbContextOptions<PortfolioEntities> options)
        : base(options) {}

    public DbSet<Blurb> Blurbs { get; set; }
}
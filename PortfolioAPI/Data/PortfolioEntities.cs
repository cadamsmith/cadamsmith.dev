using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;

namespace PortfolioAPI.Data;

public class PortfolioEntities : DbContext
{
    public PortfolioEntities(DbContextOptions<PortfolioEntities> options)
        : base(options) {}

    public DbSet<Blurb> Blurbs { get; set; }
    public DbSet<PersonalData> PersonalData { get; set; }
}
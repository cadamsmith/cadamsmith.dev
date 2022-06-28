using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Data;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services;

public interface IBlurbService
{
    Task<IEnumerable<Blurb>> GetAllAsync(CancellationToken cancellationToken);
    Task<Blurb> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<bool> ExistsWithId(int id, CancellationToken cancellationToken);
    Task<Blurb> CreateAsync(BlurbBaseData data, CancellationToken cancellationToken);
    Task<Blurb> UpdateAsync(int id, BlurbBaseData data, CancellationToken cancellationToken);
    Task ArchiveAsync(int id, CancellationToken cancellationToken);
}

public class BlurbService : IBlurbService
{
    private readonly PortfolioEntities _db;

    public BlurbService(PortfolioEntities db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Blurb>> GetAllAsync(CancellationToken cancellationToken)
    {
        var blurbs = await _db.Blurbs.Where(b => !b.IsArchived)
            .ToListAsync(cancellationToken);

        return blurbs;
    }

    public async Task<Blurb> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        try
        {
            var blurb = await _db.Blurbs.SingleAsync(b => b.Id == id && !b.IsArchived, cancellationToken);

            return blurb;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<bool> ExistsWithId(int id, CancellationToken cancellationToken)
    {
        try
        {
            bool blurbExists = await _db.Blurbs.AnyAsync(b => b.Id == id && !b.IsArchived, cancellationToken);

            return blurbExists;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Blurb> CreateAsync(BlurbBaseData data, CancellationToken cancellationToken)
    {
        var blurb = new Blurb(data.Name, data.Content);

        await _db.Blurbs.AddAsync(blurb);
        await _db.SaveChangesAsync(cancellationToken);

        return blurb;
    }

    public async Task<Blurb> UpdateAsync(int id, BlurbBaseData data, CancellationToken cancellationToken)
    {
        try
        {
            var blurb = _db.Blurbs.Single(b => b.Id == id && !b.IsArchived);

            blurb.Name = data.Name;
            blurb.Content = data.Content;
            blurb.UpdateMetadata();

            await _db.SaveChangesAsync(cancellationToken);

            return blurb;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task ArchiveAsync(int id, CancellationToken cancellationToken)
    {
        try
        {
            var blurb = await _db.Blurbs.SingleAsync(b => b.Id == id && !b.IsArchived);

            blurb.IsArchived = true;
            blurb.UpdateMetadata();

            await _db.SaveChangesAsync(cancellationToken);
        }
        catch (Exception)
        {
            throw;
        }
    }
}

public class BlurbBaseData
{
    public BlurbBaseData(string name, string content)
    {
        Name = name;
        Content = content;
    }

    public string Name { get; set; }
    public string Content { get; set; }
}
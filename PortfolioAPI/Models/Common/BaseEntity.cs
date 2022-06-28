
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioAPI.Models.Common;

public abstract class BaseEntity
{
    public BaseEntity()
    {
        CreatedAt = LastModifiedAt = DateTime.Now;
        IsArchived = false;
    }

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime LastModifiedAt { get; set; }

    public bool IsArchived { get; set; }
}
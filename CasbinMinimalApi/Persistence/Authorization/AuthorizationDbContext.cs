using Casbin.Persist.Adapter.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CasbinMinimalApi.Infrastructure.Authorization;

public class AuthorizationDbContext(DbContextOptions<AuthorizationDbContext> options) : CasbinDbContext<int>(options)
{
    public const string SchemaName = "casbin";
    public const string MigrationTable = "__EFMigrationsHistory";

    public AuthorizationDbContext() : this(new DbContextOptions<AuthorizationDbContext>()) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured && EF.IsDesignTime)
        {
            var connection = Environment.GetEnvironmentVariable("PG_CONNECTION_STRING");

            optionsBuilder.UseNpgsql(connection,
                opt => opt.MigrationsHistoryTable(MigrationTable, SchemaName));
            optionsBuilder.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.HasDefaultSchema(SchemaName);
        base.OnModelCreating(builder);
    }
}
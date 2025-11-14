using Casbin;
using Casbin.Persist;
using Casbin.Persist.Adapter.EFCore;
using CasbinMinimalApi.Application.Authorization;
using CasbinMinimalApi.Constants;
using CasbinMinimalApi.Infrastructure.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace CasbinMinimalApi.Startup;

public static class CasbinExtensions
{
  public static async Task ConfigureCasbinAsync(this WebApplicationBuilder builder)
  {
    var policyPath = Path.Combine(builder.Environment.ContentRootPath, "Casbin", "rbac_model.conf");
    var connectionString = builder.Configuration[ConfigurationKey.ConnectionString] ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

    builder.Services.AddDbContext<AuthorizationDbContext>((_, optionsBuilder) =>
    {
      optionsBuilder
              .UseNpgsql(connectionString,
                  options =>
                  {
                    options.MigrationsHistoryTable("__EFMigrationsHistory", "casbin");
                  });
      optionsBuilder.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning));
    });
    builder.Services.AddScoped<AuthorizationDbContext>();

    var authorizationDbContext = builder.Services.BuildServiceProvider().GetRequiredService<AuthorizationDbContext>();
    await authorizationDbContext.Database.MigrateAsync();

    // Configure Adapter and Enforcer
    var adapter = new EFCoreAdapter<int>(authorizationDbContext);
    var enforcer = new Enforcer(policyPath, adapter);
    builder.Services.AddScoped<IAdapter>(_ => adapter);
    builder.Services.AddScoped<IEnforcer>(_ => enforcer);

    // Custom casbin services
    builder.Services.AddScoped<IAuthorizationService, CasbinAuthorizationService>();

    // Initialize Casbin with default roles and permissions
    builder.Services.AddScoped<IRoleService, CasbinRoleService>();
  }

  public static IApplicationBuilder UseCasbinAuthorization(this IApplicationBuilder app)
      => app.UseMiddleware<CasbinAuthorizationMiddleware>();
}

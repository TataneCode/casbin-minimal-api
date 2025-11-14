using CasbinMinimalApi.Constants;
using Microsoft.Extensions.Configuration;

namespace CasbinMinimalApi.Startup;

public static class CorsExtensions
{
    public static void ConfigureCors(this WebApplicationBuilder builder)
    {
        if (!builder.Environment.IsDevelopment()) return;

        var policyName = builder.Configuration.GetValue<string>(ConfigurationKey.DevCorsPolicyName);
        var origin = builder.Configuration.GetValue<string>(ConfigurationKey.DevCorsOrigin);
        if (string.IsNullOrWhiteSpace(policyName) || string.IsNullOrWhiteSpace(origin)) return;

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(policyName, policy =>
            {
                policy.WithOrigins(origin)
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });
    }

    public static void UseCorsIfDevelopment(this WebApplication app)
    {
        if (!app.Environment.IsDevelopment()) return;
        var policyName = app.Configuration.GetValue<string>(ConfigurationKey.DevCorsPolicyName);
        if (string.IsNullOrWhiteSpace(policyName)) return;
        app.UseCors(policyName);
    }
}

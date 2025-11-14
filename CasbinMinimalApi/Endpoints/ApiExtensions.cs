using CasbinMinimalApi.Domain;
using CasbinMinimalApi.Endpoints.Authorization;
using CasbinMinimalApi.Endpoints.Neighbors;
using CasbinMinimalApi.Endpoints.Oidc;

namespace CasbinMinimalApi.Endpoints;

public static class ApiExtensions
{
    public static void MapApiEndpoints(this WebApplication app)
    {
        var builder = app.MapToApi();
        
        builder.MapIdentityApi<NeighborUser>();
        builder.MapOidcEndpoints();
        builder.MapAuthorizationEndpoints();
        builder.MapNeighborEndpoints();
        builder.MapStuffEndpoints();
    }
    
    private static RouteGroupBuilder MapToApi(this WebApplication app)
    {
        return app.MapGroup("api");
    }
}
namespace CasbinMinimalApi.Endpoints.Authorization;

// Query parameter records
public record PermissionQuery(string User, string Resource, string Action);


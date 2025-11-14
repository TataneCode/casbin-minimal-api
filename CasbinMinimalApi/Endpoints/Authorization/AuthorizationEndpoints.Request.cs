namespace CasbinMinimalApi.Endpoints.Authorization;

// Request bodies for authorization operations
public record AddPermissionRequest(string Resource, string Action);
public record PermissionBodyRequest(string Resource, string Action);
public record PermissionRequest(string User, string Resource, string Action);


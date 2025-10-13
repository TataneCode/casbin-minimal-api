namespace CasbinMinimalApi.Endpoints.Authorization;

// Request bodies for authorization operations
public record AddPermissionRequest(string Resource, string Action);
public record PermissionBodyOrQuery(string Resource, string Action);


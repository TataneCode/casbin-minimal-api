namespace CasbinMinimalApi.Endpoints.Authorization;

// Response records for authorization endpoints
public record PermissionCheckResponse(bool Allowed);
public record RoleAssignmentResponse(bool Added);
public record RoleRemovalResponse(bool Removed);
public record PermissionAddedResponse(bool Added);
public record PermissionRemovedResponse(bool Removed);


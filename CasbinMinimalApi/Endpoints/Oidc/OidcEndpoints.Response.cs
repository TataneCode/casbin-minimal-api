namespace CasbinMinimalApi.Endpoints.Oidc;

// OIDC response models
public record UserInfo(string Message, string? Name, IEnumerable<UserClaim>? Claims);
public record UserClaim(string Type, string Value);


namespace CasbinMinimalApi.Endpoints;

public record CreateStuffRequest(string Name, string? Description, long NeighborId);
public record UpdateStuffRequest(string Name, string? Description);


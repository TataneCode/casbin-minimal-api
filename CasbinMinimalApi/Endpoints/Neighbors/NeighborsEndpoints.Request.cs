namespace CasbinMinimalApi.Endpoints;
public record CreateNeighborRequest(string Name, string Email, AddressDto? Address);
public record UpdateNeighborRequest(string Name, string Email, AddressDto? Address);

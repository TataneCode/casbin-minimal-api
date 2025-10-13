namespace CasbinMinimalApi.Endpoints;
public record CreateNeighborRequest(string Name, string Email, AddressResponse? Address);
public record UpdateNeighborRequest(string Name, string Email, AddressResponse? Address);

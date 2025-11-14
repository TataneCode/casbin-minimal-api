namespace CasbinMinimalApi.Endpoints;

public record NeighborResponse(long Id, string Name, string Email, AddressResponse? Address);
public record AddressResponse(string Street, string City, string ZipCode);



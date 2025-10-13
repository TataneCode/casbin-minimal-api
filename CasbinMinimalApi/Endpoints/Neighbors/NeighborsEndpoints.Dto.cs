namespace CasbinMinimalApi.Endpoints;

public record NeighborDto(long Id, string Name, string Email, AddressDto? Address);
public record AddressDto(string Street, string City, string ZipCode);



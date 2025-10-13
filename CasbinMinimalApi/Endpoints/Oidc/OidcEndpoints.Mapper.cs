// Data transfer objects for Neighbor endpoints
public record NeighborDto(long Id, string Name, string Email, AddressDto? Address);
public record AddressDto(string Street, string City, string ZipCode);


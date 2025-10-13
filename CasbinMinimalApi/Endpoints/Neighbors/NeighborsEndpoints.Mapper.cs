using CasbinMinimalApi.Domain;

namespace CasbinMinimalApi.Endpoints;

// Mapper utilities for Neighbor domain objects
public static class NeighborMappers
{
    public static NeighborDto ToDto(Neighbor n) => new(
        n.Id,
        n.Name,
        n.Email,
        n.Address is null ? null : new AddressDto(n.Address.Street, n.Address.City, n.Address.ZipCode));

    public static IEnumerable<NeighborDto> ToDto(IEnumerable<Neighbor> neighbors) => neighbors.Select(ToDto);
}

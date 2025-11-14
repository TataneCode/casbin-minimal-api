using CasbinMinimalApi.Domain;

namespace CasbinMinimalApi.Endpoints;

// Mapper utilities for Neighbor domain objects
public static class NeighborMappers
{
    public static NeighborResponse ToDto(Neighbor n) => new(
        n.Id,
        n.Name,
        n.Email,
        n.Address is null ? null : new AddressResponse(n.Address.Street, n.Address.City, n.Address.ZipCode));

    public static IEnumerable<NeighborResponse> ToDto(IEnumerable<Neighbor> neighbors) => neighbors.Select(ToDto);
}

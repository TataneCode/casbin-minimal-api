using CasbinMinimalApi.Domain;

namespace CasbinMinimalApi.Endpoints;

public static class StuffMappers
{
    public static StuffDto ToDto(Stuff s) => new(s.Id, s.Name, s.Description, s.NeighborId);
    public static IEnumerable<StuffDto> ToDto(IEnumerable<Stuff> stuffs) => stuffs.Select(ToDto);
}

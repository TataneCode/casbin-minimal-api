using CasbinMinimalApi.Application.Repositories;
using CasbinMinimalApi.Domain;
using CasbinMinimalApi.Infrastructure.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CasbinMinimalApi.Endpoints;

public static class StuffEndpoints
{
  public static RouteGroupBuilder MapStuffEndpoints(this IEndpointRouteBuilder app)
  {
    var group = app.MapGroup("/stuffs")
        .WithTags("Stuffs");

    group.MapGet("/", GetAllAsync);
    group.MapGet("/{id:long}", GetByIdAsync).WithName("GetStuffById");
    group.MapPost("/", CreateAsync).RequireAuthorization().WithCasbin("stuff", "create");
    group.MapPut("/{id:long}", UpdateAsync).RequireAuthorization().WithCasbin("stuff", "update");
    group.MapDelete("/{id:long}", DeleteAsync).RequireAuthorization().WithCasbin("stuff", "delete");

    return group;
  }

  private static async Task<Ok<IEnumerable<StuffDto>>> GetAllAsync(IStuffRepository repo)
  {
    var items = await repo.GetAllAsync();
    return TypedResults.Ok(StuffMappers.ToDto(items));
  }

  private static async Task<Results<Ok<StuffDto>, NotFound>> GetByIdAsync(long id, IStuffRepository repo)
  {
    var entity = await repo.GetByIdAsync(id);
    return entity is null
        ? TypedResults.NotFound()
        : TypedResults.Ok(StuffMappers.ToDto(entity));
  }

  private static async Task<Results<Created<StuffDto>, BadRequest<string>>> CreateAsync(
      CreateStuffRequest request,
      IStuffRepository repo)
  {
    if (string.IsNullOrWhiteSpace(request.Name))
      return TypedResults.BadRequest("Name required.");
    if (request.NeighborId <= 0)
      return TypedResults.BadRequest("NeighborId must be > 0.");

    var entity = new Stuff(
        request.Name.Trim(),
        request.Description?.Trim() ?? string.Empty,
        request.NeighborId
    );

    repo.Add(entity);
    await repo.SaveChangesAsync();

    var dto = StuffMappers.ToDto(entity);
    return TypedResults.Created($"/api/stuffs/{entity.Id}", dto);
  }

  private static async Task<Results<Ok<StuffDto>, NotFound, BadRequest<string>>> UpdateAsync(
      long id,
      UpdateStuffRequest request,
      IStuffRepository repo)
  {
    var entity = await repo.GetByIdAsync(id);
    if (entity is null) return TypedResults.NotFound();

    if (string.IsNullOrWhiteSpace(request.Name))
      return TypedResults.BadRequest("Name required.");

    entity.GetType().GetProperty(nameof(Stuff.Name))!.SetValue(entity, request.Name.Trim());
    entity.GetType().GetProperty(nameof(Stuff.Description))!.SetValue(entity, request.Description?.Trim() ?? string.Empty);

    repo.Update(entity);
    await repo.SaveChangesAsync();

    var dto = StuffMappers.ToDto(entity);
    return TypedResults.Ok(dto);
  }

  private static async Task<Results<NoContent, NotFound>> DeleteAsync(long id, IStuffRepository repo)
  {
    var entity = await repo.GetByIdAsync(id);
    if (entity is null) return TypedResults.NotFound();

    repo.Delete(entity);
    await repo.SaveChangesAsync();
    return TypedResults.NoContent();
  }
}
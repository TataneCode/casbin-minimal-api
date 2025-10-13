using CasbinMinimalApi.Application.Authorization;
using CasbinMinimalApi.Application.Repositories;
using CasbinMinimalApi.Domain;
using CasbinMinimalApi.Startup;
using Microsoft.AspNetCore.Http.HttpResults;

namespace CasbinMinimalApi.Endpoints.Neighbors;

public static class NeighborEndpoints
{
  public static RouteGroupBuilder MapNeighborEndpoints(this IEndpointRouteBuilder app)
  {
    var group = app.MapGroup("/api/neighbors")
        .WithTags("Neighbors");
    
    group.MapGet("/", GetAllAsync);
    group.MapGet("/{id}", GetByIdAsync).WithName("GetNeighborById");
    group.MapPost("/", CreateAsync).RequireAuthorization();
    group.MapPut("/{id}", UpdateAsync).RequireAuthorization();
    group.MapDelete("/{id}", DeleteAsync).RequireAuthorization();

    return group;
  }

  private static async Task<Ok<IEnumerable<NeighborResponse>>> GetAllAsync(INeighborRepository repo)
  {
    var items = await repo.GetAllAsync();
    return TypedResults.Ok(items.Select(NeighborMappers.ToDto));
  }

  private static async Task<Results<Ok<NeighborResponse>, NotFound>> GetByIdAsync(long id, INeighborRepository repo)
  {
    var entity = await repo.GetByIdAsync(id);
    return entity is null
        ? TypedResults.NotFound()
        : TypedResults.Ok(NeighborMappers.ToDto(entity));
  }

  private static async Task<Results<Created<NeighborResponse>, BadRequest<string>, ForbidHttpResult>> CreateAsync(
      CreateNeighborRequest request,
      INeighborRepository repo,
      IAuthorizationService authService)
  {
    if (!await authService.HasPermissionAsync(CasbinResources.Neighbor, CasbinActions.Create)) return TypedResults.Forbid();

    if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
      return TypedResults.BadRequest("Name and Email required.");

    Address? address = null;
    if (request.Address is not null)
    {
      address = new(request.Address.Street, request.Address.City, request.Address.ZipCode);
    }

    Neighbor entity = new(request.Name, request.Email, address);

    repo.Add(entity);
    await repo.SaveChangesAsync();

    var dto = NeighborMappers.ToDto(entity);
    return TypedResults.Created($"/api/neighbors/{entity.Id}", dto);
  }

  private static async Task<Results<Ok<NeighborResponse>, NotFound, BadRequest<string>, ForbidHttpResult>> UpdateAsync(
      long id,
      UpdateNeighborRequest request,
      INeighborRepository repo,
      IAuthorizationService authService)
  {
    if (!await authService.HasPermissionAsync(CasbinResources.Neighbor, CasbinActions.Update)) return TypedResults.Forbid();

    var entity = await repo.GetByIdAsync(id);
    if (entity is null) return TypedResults.NotFound();

    if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Email))
      return TypedResults.BadRequest("Name and Email required.");

    Address? address = null;
    if (request.Address is not null)
    {
      address = new(request.Address.Street, request.Address.City, request.Address.ZipCode);
    }

    entity.UpdateName(request.Name);
    entity.UpdateEmail(request.Email);
    entity.UpdateAddress(address);

    repo.Update(entity);
    await repo.SaveChangesAsync();
    return TypedResults.Ok(NeighborMappers.ToDto(entity));
  }

  private static async Task<Results<NoContent, NotFound, ForbidHttpResult>> DeleteAsync(
    long id,
    INeighborRepository repo,
    IAuthorizationService authService)
  {
    if (!await authService.HasPermissionAsync(CasbinResources.Neighbor, CasbinActions.Delete)) return TypedResults.Forbid();

    var entity = await repo.GetByIdAsync(id);
    if (entity is null) return TypedResults.NotFound();

    repo.Delete(entity);
    await repo.SaveChangesAsync();
    return TypedResults.NoContent();
  }
}
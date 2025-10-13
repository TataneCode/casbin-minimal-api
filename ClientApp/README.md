# ClientApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## API Clients & Models

Generated TypeScript interfaces and Angular services are located under `src/app/models` and `src/app/services`.

### Available Models

Stuff: `StuffDto`, `CreateStuffRequest`, `UpdateStuffRequest`
Neighbor: `NeighborResponse`, `AddressResponse`, `CreateNeighborRequest`, `UpdateNeighborRequest`
Authorization: `PermissionCheckResponse`, `RoleAssignmentResponse`, `RoleRemovalResponse`, `PermissionAddedResponse`, `PermissionRemovedResponse`, plus request types.
OIDC: `UserInfo`, `UserClaim`

Import them via the barrel:

```ts
import { StuffDto, NeighborResponse, UserInfo } from './app/models';
```

### Services

Each service is `@Injectable({ providedIn: 'root' })` and uses `HttpClient`.

```ts
import { StuffClient } from './app/clients';
constructor(private stuffs: StuffClient) {}

this.stuffs.getAll().subscribe(list => console.log(list));
```

List of service methods:

StuffClient: `getAll()`, `getById(id)`, `create(body)`, `update(id, body)`, `delete(id)`
NeighborClient: same CRUD signature.
AuthorizationClient: `checkPermission`, `getRolesForUser`, `addRoleForUser`, `removeRoleForUser`, `getUsersForRole`, `addPermissionForRole`, `removePermissionForRole`
OidcClient: `challenge()`, `getSignedInInfo()`

### Configuration

The API base URL is defined in `src/environments/environment.ts` (`apiBaseUrl`). Adjust it to match your ASP.NET backend port.

### Notes

Tests include a lightweight typing test for `StuffClient`. For richer HTTP tests, provide mocks for `HttpClient` or switch to Angular's `provideHttpClientTesting` once added.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

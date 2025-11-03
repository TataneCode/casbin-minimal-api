import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthorizationClient } from './authorization.client';
import { environment } from '../../environments/environment';
import type {
    PermissionCheckResponse,
    RoleAssignmentResponse,
    RoleRemovalResponse,
    PermissionAddedResponse,
    PermissionRemovedResponse
} from '@models';

describe('AuthorizationClient', () => {
    let client: AuthorizationClient;
    let httpMock: HttpTestingController;
    const base = `${environment.apiBaseUrl}/casbin`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        client = TestBed.inject(AuthorizationClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('checkPermission should GET with encoded query params', () => {
        const params = { user: 'john doe', resource: '/docs/é', action: 'read' };
        let received: PermissionCheckResponse | undefined;

        client.checkPermission(params).subscribe(r => (received = r));

        const expectedUrl = `${base}/permission/check?user=${encodeURIComponent(params.user)}&resource=${encodeURIComponent(params.resource)}&action=${encodeURIComponent(params.action)}`;
        const req = httpMock.expectOne(expectedUrl);
        expect(req.request.method).toBe('GET');

        const payload: PermissionCheckResponse = { allowed: true };
        req.flush(payload);
        expect(received).toEqual(payload);
    });

    it('getRolesForUser should GET roles list', () => {
        const user = 'alice';
        let roles: string[] | undefined;
        client.getRolesForUser(user).subscribe(r => (roles = r));

        const req = httpMock.expectOne(`${base}/users/${encodeURIComponent(user)}/roles`);
        expect(req.request.method).toBe('GET');
        req.flush(['admin', 'editor']);
        expect(roles).toEqual(['admin', 'editor']);
    });

    it('addRoleForUser should POST and return assignment response', () => {
        const user = 'bob', role = 'viewer';
        let response: RoleAssignmentResponse | undefined;

        client.addRoleForUser(user, role).subscribe(r => (response = r));

        const req = httpMock.expectOne(`${base}/users/${encodeURIComponent(user)}/roles/${encodeURIComponent(role)}`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({});

        const payload: RoleAssignmentResponse = { added: true };
        req.flush(payload);
        expect(response).toEqual(payload);
    });

    it('removeRoleForUser should DELETE and return removal response', () => {
        const user = 'bob', role = 'viewer';
        let response: RoleRemovalResponse | undefined;

        client.removeRoleForUser(user, role).subscribe(r => (response = r));

        const req = httpMock.expectOne(`${base}/users/${encodeURIComponent(user)}/roles/${encodeURIComponent(role)}`);
        expect(req.request.method).toBe('DELETE');

        const payload: RoleRemovalResponse = { removed: true };
        req.flush(payload);
        expect(response).toEqual(payload);
    });

    it('getUsersForRole should GET users list', () => {
        const role = 'admin';
        let users: string[] | undefined;
        client.getUsersForRole(role).subscribe(r => (users = r));

        const req = httpMock.expectOne(`${base}/roles/${encodeURIComponent(role)}/users`);
        expect(req.request.method).toBe('GET');
        req.flush(['alice', 'carol']);
        expect(users).toEqual(['alice', 'carol']);
    });

    it('addPermissionForRole should POST with body', () => {
        const role = 'editor';
        const body = { resource: '/posts', action: 'write' } as const;
        let resp: PermissionAddedResponse | undefined;

        client.addPermissionForRole(role, body).subscribe(r => (resp = r));

        const req = httpMock.expectOne(`${base}/roles/${encodeURIComponent(role)}/permissions`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);

        const payload: PermissionAddedResponse = { added: true };
        req.flush(payload);
        expect(resp).toEqual(payload);
    });

    it('removePermissionForRole should DELETE with encoded query params', () => {
        const role = 'editor';
        const params = { resource: '/posts/é', action: 'delete' } as const;
        let resp: PermissionRemovedResponse | undefined;

        client.removePermissionForRole(role, params).subscribe(r => (resp = r));

        const expectedUrl = `${base}/roles/${encodeURIComponent(role)}/permissions?resource=${encodeURIComponent(params.resource)}&action=${encodeURIComponent(params.action)}`;
        const req = httpMock.expectOne(expectedUrl);
        expect(req.request.method).toBe('DELETE');

        const payload: PermissionRemovedResponse = { removed: true };
        req.flush(payload);
        expect(resp).toEqual(payload);
    });
});

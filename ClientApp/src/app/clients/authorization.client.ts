import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
    PermissionCheckResponse,
    RoleAssignmentResponse,
    RoleRemovalResponse,
    PermissionAddedResponse,
    PermissionRemovedResponse,
    PermissionRequest,
    AddPermissionRequest,
    PermissionBodyRequest
} from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorizationClient {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/casbin`;

    checkPermission(params: PermissionRequest): Observable<PermissionCheckResponse> {
        const { user, resource, action } = params;
        const url = `${this.baseUrl}/permission/check?user=${encodeURIComponent(user)}&resource=${encodeURIComponent(resource)}&action=${encodeURIComponent(action)}`;
        return this.http.get<PermissionCheckResponse>(url);
    }

    getRolesForUser(user: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/users/${encodeURIComponent(user)}/roles`);
    }

    addRoleForUser(user: string, role: string): Observable<RoleAssignmentResponse> {
        return this.http.post<RoleAssignmentResponse>(`${this.baseUrl}/users/${encodeURIComponent(user)}/roles/${encodeURIComponent(role)}`, {});
    }

    removeRoleForUser(user: string, role: string): Observable<RoleRemovalResponse> {
        return this.http.delete<RoleRemovalResponse>(`${this.baseUrl}/users/${encodeURIComponent(user)}/roles/${encodeURIComponent(role)}`);
    }

    getUsersForRole(role: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/roles/${encodeURIComponent(role)}/users`);
    }

    addPermissionForRole(role: string, body: AddPermissionRequest): Observable<PermissionAddedResponse> {
        return this.http.post<PermissionAddedResponse>(`${this.baseUrl}/roles/${encodeURIComponent(role)}/permissions`, body);
    }

    removePermissionForRole(role: string, params: PermissionBodyRequest): Observable<PermissionRemovedResponse> {
        const url = `${this.baseUrl}/roles/${encodeURIComponent(role)}/permissions?resource=${encodeURIComponent(params.resource)}&action=${encodeURIComponent(params.action)}`;
        return this.http.delete<PermissionRemovedResponse>(url);
    }
}

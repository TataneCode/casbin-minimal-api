import { apiFetch } from './http';
import { PermissionCheckResponse, RoleAssignmentResponse, RoleRemovalResponse, PermissionAddedResponse, PermissionRemovedResponse, PermissionRequest, AddPermissionRequest, PermissionBodyRequest } from '../../models';

const base = '/casbin';

export const authorizationApi = {
    checkPermission: (p: PermissionRequest) => apiFetch<PermissionCheckResponse>(`${base}/permission/check?user=${encodeURIComponent(p.user)}&resource=${encodeURIComponent(p.resource)}&action=${encodeURIComponent(p.action)}`),
    getRolesForUser: (user: string) => apiFetch<string[]>(`${base}/users/${encodeURIComponent(user)}/roles`),
    addRoleForUser: (user: string, role: string) => apiFetch<RoleAssignmentResponse>(`${base}/users/${encodeURIComponent(user)}/roles/${encodeURIComponent(role)}`, { method: 'POST', json: {} }),
    removeRoleForUser: (user: string, role: string) => apiFetch<RoleRemovalResponse>(`${base}/users/${encodeURIComponent(user)}/roles/${encodeURIComponent(role)}`, { method: 'DELETE' }),
    getUsersForRole: (role: string) => apiFetch<string[]>(`${base}/roles/${encodeURIComponent(role)}/users`),
    addPermissionForRole: (role: string, body: AddPermissionRequest) => apiFetch<PermissionAddedResponse>(`${base}/roles/${encodeURIComponent(role)}/permissions`, { method: 'POST', json: body }),
    removePermissionForRole: (role: string, p: PermissionBodyRequest) => apiFetch<PermissionRemovedResponse>(`${base}/roles/${encodeURIComponent(role)}/permissions?resource=${encodeURIComponent(p.resource)}&action=${encodeURIComponent(p.action)}`, { method: 'DELETE' })
};

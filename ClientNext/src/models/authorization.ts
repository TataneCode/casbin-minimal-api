export interface PermissionCheckResponse { allowed: boolean; }
export interface RoleAssignmentResponse { added: boolean; }
export interface RoleRemovalResponse { removed: boolean; }
export interface PermissionAddedResponse { added: boolean; }
export interface PermissionRemovedResponse { removed: boolean; }

export interface PermissionRequest { user: string; resource: string; action: string; }
export interface AddPermissionRequest { resource: string; action: string; }
export interface PermissionBodyRequest { resource: string; action: string; }

import { apiFetch } from './http';
import { NeighborResponse, CreateNeighborRequest, UpdateNeighborRequest } from '../../models';

// Align with backend route group /api/neighbors
const base = '/api/neighbors';

export const neighborsApi = {
    list: () => apiFetch<NeighborResponse[]>(`${base}`),
    get: (id: number) => apiFetch<NeighborResponse>(`${base}/${id}`),
    create: (body: CreateNeighborRequest) => apiFetch<NeighborResponse>(`${base}`, { method: 'POST', json: body }),
    update: (id: number, body: UpdateNeighborRequest) => apiFetch<NeighborResponse>(`${base}/${id}`, { method: 'PUT', json: body }),
    delete: (id: number) => apiFetch<void>(`${base}/${id}`, { method: 'DELETE' })
};

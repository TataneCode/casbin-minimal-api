import { apiFetch } from './http';
import { StuffDto, CreateStuffRequest, UpdateStuffRequest } from '../../models';

const base = '/api/stuffs';

export const stuffsApi = {
    list: () => apiFetch<StuffDto[]>(`${base}`),
    get: (id: number) => apiFetch<StuffDto>(`${base}/${id}`),
    create: (body: CreateStuffRequest) => apiFetch<StuffDto>(`${base}`, { method: 'POST', json: body }),
    update: (id: number, body: UpdateStuffRequest) => apiFetch<StuffDto>(`${base}/${id}`, { method: 'PUT', json: body }),
    delete: (id: number) => apiFetch<void>(`${base}/${id}`, { method: 'DELETE' })
};

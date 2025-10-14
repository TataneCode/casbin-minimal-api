import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import type { NeighborResponse, CreateNeighborRequest, UpdateNeighborRequest } from '../models';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NeighborClient {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/api/neighbors`;

    getAll(): Observable<NeighborResponse[]> {
        return this.http.get<NeighborResponse[]>(this.baseUrl);
    }

    getById(id: number): Observable<NeighborResponse> {
        return this.http.get<NeighborResponse>(`${this.baseUrl}/${id}`);
    }

    create(body: CreateNeighborRequest): Observable<NeighborResponse> {
        return this.http.post<NeighborResponse>(this.baseUrl, body);
    }

    update(id: number, body: UpdateNeighborRequest): Observable<NeighborResponse> {
        return this.http.put<NeighborResponse>(`${this.baseUrl}/${id}`, body);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

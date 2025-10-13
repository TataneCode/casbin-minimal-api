import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StuffDto, CreateStuffRequest, UpdateStuffRequest } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StuffService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/api/stuffs`;

    getAll(): Observable<StuffDto[]> {
        return this.http.get<StuffDto[]>(this.baseUrl);
    }

    getById(id: number): Observable<StuffDto> {
        return this.http.get<StuffDto>(`${this.baseUrl}/${id}`);
    }

    create(body: CreateStuffRequest): Observable<StuffDto> {
        return this.http.post<StuffDto>(this.baseUrl, body);
    }

    update(id: number, body: UpdateStuffRequest): Observable<StuffDto> {
        return this.http.put<StuffDto>(`${this.baseUrl}/${id}`, body);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

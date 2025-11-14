import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StuffClient } from './stuff.client';
import { environment } from '../../environments/environment';
import type { StuffDto, CreateStuffRequest, UpdateStuffRequest } from '@models';

describe('StuffClient', () => {
    let client: StuffClient;
    let httpMock: HttpTestingController;
    const base = `${environment.apiBaseUrl}/stuffs`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        client = TestBed.inject(StuffClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('getAll should GET list of stuffs', () => {
        let data: StuffDto[] | undefined;
        client.getAll().subscribe(r => (data = r));

        const req = httpMock.expectOne(base);
        expect(req.request.method).toBe('GET');
        const payload: StuffDto[] = [
            { id: 1, name: 'Hammer', description: 'Steel hammer', neighborId: 2 },
            { id: 2, name: 'Drill', description: 'Cordless drill', neighborId: 3 },
        ];
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('getById should GET a single stuff', () => {
        const id = 42;
        let data: StuffDto | undefined;
        client.getById(id).subscribe(r => (data = r));

        const req = httpMock.expectOne(`${base}/${id}`);
        expect(req.request.method).toBe('GET');
        const payload: StuffDto = { id, name: 'Saw', description: 'Hand saw', neighborId: 7 };
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('create should POST and return created stuff', () => {
        const body: CreateStuffRequest = { name: 'Wrench', description: 'Adjustable', neighborId: 5 };
        let data: StuffDto | undefined;
        client.create(body).subscribe(r => (data = r));

        const req = httpMock.expectOne(base);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);
        const payload: { id: number; name: string; description?: string | null; neighborId: number } = { id: 10, ...body };
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('update should PUT and return updated stuff', () => {
        const id = 10;
        const body: UpdateStuffRequest = { name: 'Wrench XL', description: 'Bigger' };
        let data: StuffDto | undefined;
        client.update(id, body).subscribe(r => (data = r));

        const req = httpMock.expectOne(`${base}/${id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(body);
        const payload: StuffDto = { id, ...body } as StuffDto;
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('delete should send DELETE and return void', () => {
        const id = 11;
        let completed = false;
        client.delete(id).subscribe(() => (completed = true));

        const req = httpMock.expectOne(`${base}/${id}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
        expect(completed).toBe(true);
    });
});

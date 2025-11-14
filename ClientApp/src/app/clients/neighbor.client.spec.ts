// filepath: /home/tatane/RiderProjects/CasbinMinimalApi/ClientApp/src/app/clients/neighbor.client.spec.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { NeighborClient } from './neighbor.client';
import { environment } from '../../environments/environment';
import type { NeighborResponse, CreateNeighborRequest, UpdateNeighborRequest } from '@models';

describe('NeighborClient', () => {
    let client: NeighborClient;
    let httpMock: HttpTestingController;
    const base = `${environment.apiBaseUrl}/neighbors`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        client = TestBed.inject(NeighborClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('getAll should GET neighbors list', () => {
        let data: NeighborResponse[] | undefined;
        client.getAll().subscribe(r => (data = r));

        const req = httpMock.expectOne(base);
        expect(req.request.method).toBe('GET');
        const payload: NeighborResponse[] = [
            { id: 1, name: 'Alice', email: 'alice@example.com', address: { street: '1st st', city: 'Paris', zipCode: '75001' } },
            { id: 2, name: 'Bob', email: 'bob@example.com', address: { street: '2nd st', city: 'Lyon', zipCode: '69001' } },
        ];
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('getById should GET a single neighbor', () => {
        const id = 7;
        let data: NeighborResponse | undefined;
        client.getById(id).subscribe(r => (data = r));

        const req = httpMock.expectOne(`${base}/${id}`);
        expect(req.request.method).toBe('GET');
        const payload: NeighborResponse = { id, name: 'Carol', email: 'carol@example.com', address: { street: '3rd st', city: 'Marseille', zipCode: '13001' } };
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('create should POST and return created neighbor', () => {
        const body: CreateNeighborRequest = { name: 'Dave', email: 'dave@example.com', address: { street: '4th st', city: 'Paris', zipCode: '75002' } };
        let data: NeighborResponse | undefined;
        client.create(body).subscribe(r => (data = r));

        const req = httpMock.expectOne(base);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(body);
        const payload: NeighborResponse = { id: 10, ...body } as NeighborResponse;
        req.flush(payload);
        expect(data).toEqual(payload);
    });

    it('update should PUT and return updated neighbor', () => {
        const id = 10;
        const body: UpdateNeighborRequest = { name: 'Dave Jr', email: 'davejr@example.com', address: { street: '4th st apt 2', city: 'Paris', zipCode: '75002' } };
        let data: NeighborResponse | undefined;
        client.update(id, body).subscribe(r => (data = r));

        const req = httpMock.expectOne(`${base}/${id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(body);
        const payload: NeighborResponse = { id, ...body } as NeighborResponse;
        req.flush(payload);
        expect(data).toEqual(payload);
    });

});

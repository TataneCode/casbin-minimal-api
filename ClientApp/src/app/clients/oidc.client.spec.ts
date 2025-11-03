import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { OidcClient } from './oidc.client';
import { environment } from '../../environments/environment';
import type { UserInfo } from '@models';

describe('OidcClient', () => {
    let client: OidcClient;
    let httpMock: HttpTestingController;
    const base = `${environment.apiBaseUrl}/oidc`;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        client = TestBed.inject(OidcClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('challenge should GET /challenge and return void', () => {
        let done = false;
        client.challenge().subscribe(() => (done = true));

        const req = httpMock.expectOne(`${base}/challenge`);
        expect(req.request.method).toBe('GET');
        req.flush(null);

        expect(done).toBe(true);
    });

    it('getSignedInInfo should GET user info', () => {
        let info: UserInfo | undefined;
        client.getSignedInInfo().subscribe(r => (info = r));

        const req = httpMock.expectOne(`${base}/signedin`);
        expect(req.request.method).toBe('GET');

        const payload: UserInfo = { message: 'ok', name: 'Alice', claims: [{ type: 'email', value: 'alice@example.com' }] };
        req.flush(payload);

        expect(info).toEqual(payload);
    });
});

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserInfo } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OidcClient {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = `${environment.apiBaseUrl}/oidc`;

    // Initiates the challenge (server will redirect). Usually you'd navigate to /oidc/challenge.
    challenge(): Observable<void> {
        return this.http.get<void>(`${this.baseUrl}/challenge`);
    }

    getSignedInInfo(): Observable<UserInfo> {
        return this.http.get<UserInfo>(`${this.baseUrl}/signedin`);
    }
}

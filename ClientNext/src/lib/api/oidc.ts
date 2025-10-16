import { apiFetch } from './http';
import { UserInfo } from '../../models';

const base = '/oidc';

export const oidcApi = {
    // challenge endpoint triggers redirect - generally handled client side navigation
    signedIn: () => apiFetch<UserInfo>(`${base}/signedin`)
};

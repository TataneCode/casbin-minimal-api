import { config } from '../config';

interface RequestOptions extends RequestInit {
    json?: unknown;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        ...(options.json ? { 'Content-Type': 'application/json' } : {})
    };
    const res = await fetch(`${config.apiBase}${path}`, {
        ...options,
        headers: {
            ...headers,
            ...(options.headers || {}) as Record<string, string>
        },
        body: options.json ? JSON.stringify(options.json) : options.body,
        cache: 'no-store'
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error ${res.status}: ${text}`);
    }
    if (res.status === 204) return undefined as unknown as T;
    return res.json() as Promise<T>;
}

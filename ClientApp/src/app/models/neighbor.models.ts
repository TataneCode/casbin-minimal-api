// Auto-generated from C# records NeighborResponse, AddressResponse, CreateNeighborRequest, UpdateNeighborRequest
export interface AddressResponse {
    street: string;
    city: string;
    zipCode: string;
}

export interface NeighborResponse {
    id: number;
    name: string;
    email: string;
    address?: AddressResponse | null;
}

export interface CreateNeighborRequest {
    name: string;
    email: string;
    address?: AddressResponse | null;
}

export interface UpdateNeighborRequest {
    name: string;
    email: string;
    address?: AddressResponse | null;
}

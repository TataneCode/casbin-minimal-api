export interface StuffDto {
    id: number;
    name: string;
    description: string;
    neighborId: number;
}
export interface CreateStuffRequest {
    name: string;
    description?: string | null;
    neighborId: number;
}
export interface UpdateStuffRequest {
    name: string;
    description?: string | null;
}

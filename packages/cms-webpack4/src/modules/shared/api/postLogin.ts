export interface LoginRequest {
    phoneNo: string;
    code: string;
}
export interface LoginResponse {
    code?: number;
    data?: unknown;
    message?: string;
}

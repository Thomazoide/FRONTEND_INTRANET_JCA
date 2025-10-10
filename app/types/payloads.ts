export interface responsePayload<T> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
}

export interface loginSuccessPayload {
    message: string;
    statusCode: number;
    token: string;
}

export interface loginPayload {
    rut: string;
    password: string;
}

export interface accountRequest {
    rut: string;
    email: string;
}
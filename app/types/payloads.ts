import type { Feriado } from "./models";

export interface responsePayload<T> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
}

export interface loginSuccessPayload {
    message: string;
    statusCode: number;
    token?: string;
    error?: string;
}

export interface loginPayload {
    rut: string;
    password: string;
}

export interface accountRequest {
    rut: string;
    email: string;
}

export interface validateTokenPayload {
    token: string;
}

export interface ListaFeriados {
    status: string; //mensaje que indica si la request fue exitosa o no}
    data: Feriado[];
}
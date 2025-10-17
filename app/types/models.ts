export enum CARGO {
    RRHH = "RRHH",
    GUARDIA = "GUARDIA",
    TI = "TI",
    SUPERVISOR = "SUPERVISOR"
}

export interface User {
    ID: number;
    CreatedAt: Date; 
    UpdatedAt: Date; 
    DeletedAt: Date;
    nombre: string;
    apellido: string;
    rut: string;
    email: string;
    fechaNacimiento?: string;
    cargo: CARGO;
    super_user: boolean;
    password: string;
    contrato?: string;
    teamID?: number;
    profilePic?: string
}

export interface Liquidacion {
    ID: number;
    CreatedAt: Date; 
    UpdatedAt: Date; 
    DeletedAt: Date;
    path: string;
    userID: number;
    year: number;
    month: number;
}

export interface AccountRequest {
    ID: number;
    CreatedAt: Date; 
    UpdatedAt: Date; 
    DeletedAt: Date;
    rut: string;
    email: string;
    validated: boolean;
    ignored: boolean;
}

export interface LiquidationRequest {
    ID: number;
    CreatedAt: Date; 
    UpdatedAt: Date; 
    DeletedAt: Date;
    message: string;
    completada: boolean;
    userID: number;
}

export interface Feriado {
    date: string; //fecha en formato YYYY-MM-DD
    title: string;
    type: "Civil" | "Religioso";
    inaleniable: boolean; //Irrenunciable: si/no
    extra: string; //Info extra del feriado, bastante irrelevante.
}

export interface BirthdayInfo {
    userID: number; //ID del usuario en BBDD
    fullName: string; //Nombre completo de la persona de cumpleaños
    date: string; //Fecha del cumpleaños en formato YYYY-MM-DD
}
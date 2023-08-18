export interface User {
    userId: number;
    primeiroNome: string;
    ultimoNome: string;
    username: string;
    email: string;
    senha: string;
    isAdmin: boolean;
}

export interface UserPerfil {
    primeiroNome: string;
    ultimoNome: string;
    username: string;
    email: string;
    senha: string;
}

export interface UserLogin {
    identificacao: string;
    senha: string;
}

export const USER_VAZIO: User = {
    userId: 0,
    primeiroNome: "",
    ultimoNome: "",
    username: "",
    email: "",
    senha: "",
    isAdmin: false,
}

export const LOGIN_VAZIO: UserLogin = {
    identificacao: "",
    senha: "",
}
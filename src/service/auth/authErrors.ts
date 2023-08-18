import { FirebaseError } from "firebase/app";

export const authErrors = (prefixo: string, error: FirebaseError) => {
    console.log(error.code)

    switch (error.code) {
        case "auth/wrong-password":
        case "auth/invalid-email": alert(prefixo + "E-mail ou senha inválido(a).")
            break;

        case "auth/user-not-found": alert(prefixo + "Usuário não cadastrado ou não encontrado.")
            break;

        case "auth/weak-password": alert(prefixo + "Sua senha deve ter ao menos 6 caracteres.")
            break;

        case "auth/email-already-in-use": alert(prefixo + "Este e-mail já está cadastrado.")
            break;

        default: alert(prefixo + error.message)
    }
}
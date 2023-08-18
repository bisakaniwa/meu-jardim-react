import { ChangeEvent, useCallback, useContext } from "react";
import { UserContext } from "../../context/UserContext/context";
import { User } from "../../interfaces/UserInterface";

type EditarDadosUsuario = {
    setPrimeiroNome: (primeiroNome: string) => void;
    setUltimoNome: (ultimoNome: string) => void;
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setSenha: (senha: string) => void;

//     handlePrimeiroNome: (e: ChangeEvent<HTMLInputElement>) => void;
//     handleUltimoNome: (e: ChangeEvent<HTMLInputElement>) => void;
//     handleUsername: (e: ChangeEvent<HTMLInputElement>) => void;
//     handleEmail: (e: ChangeEvent<HTMLInputElement>) => void;
//     handleSenha: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useUserContext = (): [User, EditarDadosUsuario] => {
    const { user, setUser } = useContext(UserContext);

    const setPrimeiroNome = useCallback((primeiroNome: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, primeiroNome
        }))
    }, [setUser]);

    const setUltimoNome = useCallback((ultimoNome: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, ultimoNome
        }))
    }, [setUser]);

    const setUsername = useCallback((username: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, username
        }))
    }, [setUser]);

    const setEmail = useCallback((email: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, email
        }))
    }, [setUser]);

    const setSenha = useCallback((senha: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, senha
        }))
    }, [setUser]);

    return [
        user, {
            setPrimeiroNome,
            setUltimoNome,
            setUsername,
            setEmail,
            setSenha,
            // handlePrimeiroNome,
            // handleUltimoNome,
            // handleUsername,
            // handleEmail,
            // handleSenha
        }
    ];
}
import { useCallback, useContext } from "react"
import { FirebaseUserContext } from "../../context/FirebaseUserContext/firebaseContext"
import { FirebaseUser } from "../../interfaces/FirebaseUserInterface";
import { firebaseAuth } from "../../config/firebase-config";

type AtualizarDadosUser = {
    setUid: (uid: string) => void;
    setDisplayName: (displayName: string) => void;
    setEmail: (email: string) => void;
    setEmailVerified: (emailVerified: boolean) => void;
    setPhotoURL: (photoURL: string) => void;
    setProviderId: (providerId: string) => void;
}

export const useFirebaseUserContext = () => {
    const { user, setUser } = useContext(FirebaseUserContext);
    const currentUser = firebaseAuth.currentUser;

    const setUid = useCallback((uid: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, uid
        }))
    }, [setUser]);

    const setDisplayName = useCallback((displayName: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, displayName
        }))
    }, [setUser]);

    const setEmail = useCallback((email: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, email
        }))
    }, [setUser]);

    const setEmailVerified = useCallback((emailVerified: boolean) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, emailVerified
        }))
    }, [setUser]);

    const setPhotoURL = useCallback((photoURL: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, photoURL
        }))
    }, [setUser]);

    const setProviderId = useCallback((providerId: string) => {
        setUser((estadoAnterior) => ({
            ...estadoAnterior, providerId
        }))
    }, [setUser]);

    return { user, setUser }
}
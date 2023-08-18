import { useState, useEffect } from "react";
import { FirebaseUserContext } from "./firebaseContext";
import { User, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase-config";

type FirebaseProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const FirebaseUserProvider = ({ children }: FirebaseProviderProps) => {
    const [user, setUser] = useState<User>({} as User);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser)
            }
        })
    }, [])

    return (
        <FirebaseUserContext.Provider value={{ user, setUser }}>
            {children}
        </FirebaseUserContext.Provider>
    )
}
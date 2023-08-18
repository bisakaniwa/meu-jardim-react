import { useState } from "react";
import { FirebaseUserContext } from "./firebaseContext";
import { FirebaseUser, USER_VAZIO } from "../../interfaces/FirebaseUserInterface";

type FirebaseProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const FirebaseUserProvider = ({ children }: FirebaseProviderProps) => {
    const [user, setUser] = useState<FirebaseUser>(USER_VAZIO);

    return (
        <FirebaseUserContext.Provider value={{ user, setUser }}>
            {children}
        </FirebaseUserContext.Provider>
    )
}
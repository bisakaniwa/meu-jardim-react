import { createContext } from "react"
import { FirebaseUser } from "../../interfaces/FirebaseUserInterface";

type FirebaseUserType = {
    user: FirebaseUser,
    setUser: React.Dispatch<React.SetStateAction<FirebaseUser>>,
};

export const FirebaseUserContext = createContext<FirebaseUserType>({
    user: {} as FirebaseUser,
    setUser: () => { },
});
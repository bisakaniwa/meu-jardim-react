import { createContext } from "react"
import { User } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase-config";

type FirebaseUserType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User>>,
};

export const FirebaseUserContext = createContext<FirebaseUserType>({
    user: firebaseAuth.currentUser,
    setUser: () => { },
});
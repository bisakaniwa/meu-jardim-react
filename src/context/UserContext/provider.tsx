import { useState } from "react";
import { UserContext } from "./context";
import { USER_VAZIO, User } from "../../interfaces/UserInterface";

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
};

export const UserProvider = ({ children }: ProviderProps) => {
    const [user, setUser] = useState<User>(USER_VAZIO);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
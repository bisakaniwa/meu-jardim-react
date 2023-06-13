import { createContext } from "react"
import { User } from "../../interfaces/UserInterface"

type UserType = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User>>,
}

export const UserContext = createContext<UserType>({
    user: {} as User,
    setUser: () => {},
});
import { useNavigate } from "react-router-dom";
import { useFirebaseUserContext } from "../../hooks/useFirebaseUserContext";

export const UsersService = () => {
    const { user } = useFirebaseUserContext()
    const navigate = useNavigate();


}
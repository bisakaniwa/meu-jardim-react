import { useNavigate } from "react-router-dom";
import { firebaseAuth, firestore } from "../../config/firebase-config"
import { CadastroInterface } from "../../interfaces/AuthInterface";
import { addDoc, collection } from "firebase/firestore";

export const UsersService = () => {
    const user = firebaseAuth.currentUser;
    const navigate = useNavigate();

    
}
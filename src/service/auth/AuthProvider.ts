import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseAuth } from '../../config/firebase-config'
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';


export const AuthProvider = () => {
    firebaseAuth.languageCode = 'pt-BR'
    const googleProvider = new GoogleAuthProvider();
    const user = firebaseAuth.currentUser;
    const navigate = useNavigate();
    
    onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
            console.log("Usuário logado: " + user.email)
    
        } else {
            console.log("Nenhum usuário logado.")
        }
    })

    const cadastrar = async (email: string, password: string) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(() => {
                alert("Cadastro realizado com sucesso!");
                navigate("/home")
            })
            .catch((error: FirebaseError) => {
                if (error.code === "auth/weak-password") {
                    alert("Sua senha deve ter pelo menos 6 caracteres!")
                } else if (error.code === "auth/email-already-in-use") {
                    alert("Esse e-mail já está cadastrado! Recupere sua senha clicando abaixo ou tente logar de outra forma.")
                } else {
                    alert("Algo deu errado no seu cadastro...")
                }
            })
    }

    const loginEmailSenha = async (email: string, password: string) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then(() => {
                alert("Login realizado com sucesso!")
                navigate("/home")
            })

            .catch((error: FirebaseError) => {
                if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
                    alert("Ops! Parece que o e-mail ou a senha não está correto...")
                } else if (error.code === "auth/user-not-found") {
                    alert("Parece que você não está cadastrado(a)! Registre-se clicando abaixo!")
                } else {
                    alert("Houve um erro... Por favor, tente novamente!")
                }
            })
    }

    const redefinirSenha = async (email: string) => {
        sendPasswordResetEmail(firebaseAuth, email)
            .then(() => alert("E-mail enviado com sucesso!"))
            .catch((error) => {
                alert("Falha ao enviar e-mail.")
                console.log(error);
            })

    }

    const verificarEmail = async () => {
        if (user !== null) {
            sendEmailVerification(user)
                .then(() => alert("E-mail enviado para" + user.email + "com sucesso."))
                .catch((error) => {
                    alert("Falha ao enviar e-mail.")
                    console.log(error)
                })
        } else {
            alert("Nenhum usuário logado.")
        }
    }

    const loginGoogle = async () => {
        signInWithPopup(firebaseAuth, googleProvider)
            .then(() => navigate("/home"))
            .catch((error) => {
                alert("Erro ao autenticar usando o Google.")
                console.log(error)
            })
    }

    const sair = async () => {
        signOut(firebaseAuth)
            .catch((error) => {
                alert("Houve um problema ao sair da sua conta.")
                console.log(error)
            })
    }

    return { cadastrar, loginEmailSenha, redefinirSenha, verificarEmail, loginGoogle, sair }
}
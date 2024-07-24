import { GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, getIdTokenResult, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { firebaseAuth } from '../../config/firebase-config'
import { FirebaseError } from 'firebase/app';
import { useUserDispatch } from '../../redux/configureStore';
import { appInitialState, clearOnLogout, saveUserData, saveUserToken } from '../../redux/user';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = () => {
    firebaseAuth.languageCode = 'pt-BR';
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useUserDispatch();
    const navigate = useNavigate();

    const onAuthSuccess = async (userData: User) => {
        if (userData) {
            let tokenInfo = await getIdTokenResult(userData, false);
            let customUser = {
                userId: userData?.uid,
                displayName: userData?.displayName,
                email: userData?.email,
                emailVerified: userData?.emailVerified,
                isAnonymous: userData?.isAnonymous,
                photoURL: userData?.photoURL,
                loginProvider: userData?.providerData[0]?.providerId,
            };
            let customTokenInfo = {
                currentToken: tokenInfo?.token,
                expirationTime: tokenInfo?.expirationTime,
                isExpired: false,
            };
            dispatch(saveUserData(customUser));
            dispatch(saveUserToken(customTokenInfo));
        }
    }

    const cadastrar = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (resposta: UserCredential) => {
                return await onAuthSuccess(resposta.user).then(() => navigate("/home"));
            })
            .catch((error: FirebaseError) => {
                return { error }
            });
    };

    const loginEmailSenha = async (email: string, password: string) => {
        await signInWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (resposta: UserCredential) => {
                return await onAuthSuccess(resposta.user).then(() => navigate("/home"));
            })
            .catch((error: FirebaseError) => {
                if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
                    alert("Ops! Parece que o e-mail ou a senha não está correto...");
                } else if (error.code === "auth/user-not-found") {
                    alert("Parece que você não está cadastrado(a)! Registre-se clicando abaixo!");
                } else {
                    alert("Houve um erro... Por favor, tente novamente!");
                };
                console.log("erro", error);
            });
    };

    const redefinirSenha = async (email: string) => {
        sendPasswordResetEmail(firebaseAuth, email)
            .catch((error) => {
                return { error };
            })
    };

    // const verificarEmail = async () => {
    //     if (user !== null) {
    //         sendEmailVerification(user)
    //             .then(() => alert("E-mail enviado para" + user.email + "com sucesso."))
    //             .catch((error) => {
    //                 alert("Falha ao enviar e-mail.")
    //                 console.log(error)
    //             })
    //     } else {
    //         alert("Nenhum usuário logado.")
    //     }
    // };

    const loginGoogle = async () => {
        await signInWithPopup(firebaseAuth, googleProvider)
            .then(async (resposta: UserCredential) => {
                return await onAuthSuccess(resposta.user).then(() => navigate("/home"));
            })
            .catch((error: FirebaseError) => {
                alert("Erro ao autenticar usando o Google");
                return { error };
            });
    };

    const sair = async () => {
        await signOut(firebaseAuth).then(() => {
            dispatch(clearOnLogout(appInitialState));
            navigate("/");
        }).catch((error) => {
            console.log(error);
            return { error };
        })
    };

    return { cadastrar, loginEmailSenha, redefinirSenha, loginGoogle, sair };
};
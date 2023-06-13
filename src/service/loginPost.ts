import { baseURL } from "../config/axios-config";
import axios from 'axios'
import { UserLogin } from "../interfaces/UserInterface";

export const loginService = () => ({

    tryLogin: async (dadosLogin: UserLogin) => {
        try {
            const response = await axios.post(`${baseURL}/user/login`, dadosLogin);
            return response.data;

        } catch (error) {
            console.log(error)
            alert("Usuário, e-mail ou senha incorretos, por favor, tente novamente.")
        }
    },

    // getUserData: async (identificacao: string) => {
    //     try {
    //         const response = await axios.get(`${baseURL}/user/${identificacao}`);
    //         return response.data;
        
    //     } catch (error) {
    //         console.log(error);
    //         alert("Algo deu errado! Por favor, tente novamente.")
    //     }
    // }
})
import { UserPerfil } from "../../interfaces/UserInterface";
import axios from 'axios'
import { baseURL } from "../../config/axios-config";

export const cadastroService = () => ({

    cadastrar: async (novoUser: UserPerfil) => {
        try {
            // const response = await axios.post(`${baseURL}/user`, novoUser);
            // return response.data;

            console.log(novoUser);
            axios.post(`${baseURL}/user`, novoUser).then((response: any) => {return response.data});
            alert("Usuário cadastrado com sucesso!")

        } catch (error) {
            console.log(error);
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    }
})
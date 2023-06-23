import axios from 'axios'
import { baseURL } from '../config/axios-config'
import { UserPerfil } from '../interfaces/UserInterface'

export const perfilService = () => ({

    editarPerfil: async (userEditado: UserPerfil) => {
        try {
            const response = await axios.put(`${baseURL}/user/atualizar`, userEditado);
            alert("Dados atualizados com sucesso!")
            return response.data;
        } catch (error) {
            console.log(error)
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    },

    excluirPerfil: async (userId: number) => {
        try {
            axios.delete(`${baseURL}/user/${userId}`)
            alert("Perfil excluído com sucesso.")
        } catch (error) {
            console.log(error)
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    },
})
import axios from 'axios'
import { baseURL } from "../../config/axios-config";
import { Planta } from "../../interfaces/PlantaInterface";

export const plantaService = () => ({

    cadastrarPlanta: async (planta: Planta, userId: number) => {
        try {
            axios.post(`${baseURL}/plantasReferencia`, planta, { params: { userId } })
                .then((response: any) => { return response.data });

            alert("Planta cadastrada com sucesso!");

        } catch (error) {
            console.log(error);
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    },

    editarPlanta: async (planta: Planta, userId: number) => {
        try {
            axios.put(`${baseURL}/plantasReferencia`, planta, { params: { userId } })
                .then((response: any) => { return response.data });

            alert("Planta atualizada com sucesso!");

        } catch (error) {
            console.log(error);
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    },

    excluirPlanta: async (plantaId: number, userId: number) => {
        try {
            axios.delete(`${baseURL}/plantasReferencia/${plantaId}`, { params: { userId } })
                .then((response: any) => { return response.data });

            alert("Planta excluída com sucesso.")

        } catch (error) {
            console.log(error);
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    }

})
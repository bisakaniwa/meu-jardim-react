import { useState } from "react";
import { Planta } from "../../interfaces/PlantaInterface";
import axios from "axios";
import { baseURL } from "../../config/axios-config";

export const useBuscarPlantas = () => {
    const [plantas, setPlantas] = useState<Planta[]>([]);

    const buscarPlantas = async () => {
        try {
            axios.get(`${baseURL}/plantasReferencia`)
                .then(response => {
                    setPlantas(response.data);
                    return response.data
                })
        } catch (error) {
            console.log(error);
            alert("Algo deu errado! Por favor, tente novamente.")
        }
    }

    return [{ plantas, setPlantas, buscarPlantas}];
}
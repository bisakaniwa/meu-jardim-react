import axios from 'axios'
import { baseURL } from '../../../config/axios-config';
import { useEffect, useState } from "react"
import { Planta } from "../../../interfaces/PlantaInterface";

export const ListaPlantas = () => {
    const [plantas, setPlantas] = useState<Planta[]>([]);

    useEffect(() => {
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
    }, [])

    return (
        <ul>
            {plantas.map(planta =>
                <li> {planta.nome} </li>
            )}
        </ul>
    )
}
import { useContext } from "react"
import { PlantaContext } from "../../context/PlantaContext/plantaContext"

export const usePlantaContext = () => {
    const { planta, setPlanta } = useContext(PlantaContext);

    return { planta, setPlanta }
}
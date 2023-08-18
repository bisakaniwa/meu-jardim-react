import { createContext } from "react"
import { Planta } from "../../interfaces/PlantaInterface"

type PlantaContextType = {
    planta: Planta,
    setPlanta: React.Dispatch<React.SetStateAction<Planta>>,
};

export const PlantaContext = createContext<PlantaContextType>({
    planta: {} as Planta,
    setPlanta: () => {},
});
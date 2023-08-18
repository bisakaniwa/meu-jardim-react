import { useState } from "react";
import { Planta } from "../../interfaces/PlantaInterface";
import { PlantaContext } from "./plantaContext";

type PlantaProviderType = {
    children: JSX.Element | JSX.Element[];
};

export const PlantaProvider = ({ children }: PlantaProviderType) => {
    const [planta, setPlanta] = useState<Planta>({} as Planta);

    return (
        <PlantaContext.Provider value={{ planta, setPlanta }}>
            {children}
        </PlantaContext.Provider>
    )
}
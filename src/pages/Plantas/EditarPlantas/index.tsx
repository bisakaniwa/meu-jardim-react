import { Card, CardContent, Grid, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { PlantaForm } from "../../../components/PlantaForm"
import { Planta } from "../../../interfaces/PlantaInterface"
import { SubmitHandler } from "react-hook-form"
import { PlantaService } from "../../../service/database/PlantaService"
import { usePlantaContext } from "../../../hooks/usePlantaContext"
import { FirestoreService } from "../../../service/firestore/FirestoreService"

export const EditarPlantas = () => {
    // const { editarPlanta } = PlantaService();
    const {editarPlanta} = FirestoreService()
    const { planta } = usePlantaContext();
    const navigate = useNavigate();

    const handleEditar: SubmitHandler<Planta> = (data: Planta) => {
        editarPlanta(data)
    }

    const handleVoltar = () => {
        navigate("/plantas")
    }

    return (
        <Card raised sx={{ width: "80%", mt: "5%", ml: "10%" }}>
            <Grid container justifyContent="center" mt="2%" mb="1%">
                <Grid item>
                    <Typography
                        fontWeight="500"
                        fontSize="2rem"
                    >
                        Edite os dados da sua planta:
                    </Typography>
                </Grid>
            </Grid>
            <CardContent>
                <PlantaForm
                    funcaoSubmit={handleEditar}
                    funcaoVoltar={handleVoltar}
                    nomeBotao="Atualizar"
                    planta={planta}
                />
            </CardContent>
        </Card>
    )
}
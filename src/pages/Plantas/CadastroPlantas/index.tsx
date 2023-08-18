import { SubmitHandler } from "react-hook-form"
import { PlantaForm } from "../../../components/PlantaForm"
import { Planta } from "../../../interfaces/PlantaInterface"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { FirestoreService } from "../../../service/firestore/FirestoreService"

export const CadastroPlantas = () => {
    const navigate = useNavigate();
    const { cadastrarPlanta } = FirestoreService();

    const handleCadastrar: SubmitHandler<Planta> = (data: Planta) => {
        cadastrarPlanta(data)
    }

    const voltarHome = () => {
        navigate("/home")
    }

    return (
        <Card raised sx={{ width: "80%", mt: "5%", ml: "10%" }}>
            <Grid container justifyContent="center" mt="2%" mb="1%">
                <Grid item>
                    <Typography
                        fontWeight="500"
                        fontSize="2rem"
                    >
                        Cadastre uma planta:
                    </Typography>
                </Grid>
            </Grid>
            <CardContent>
                <PlantaForm
                    funcaoSubmit={handleCadastrar}
                    funcaoVoltar={voltarHome}
                    nomeBotao="Cadastrar"
                />
            </CardContent>
        </Card>
    )
}
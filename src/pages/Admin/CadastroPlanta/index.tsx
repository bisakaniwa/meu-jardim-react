import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material"
import { PlantaForm } from "../../../components/PlantaForm"
import { useNavigate } from "react-router-dom"
import { plantaService } from "../../../service/back-Java/plantaService";
import { SubmitHandler } from "react-hook-form";
import { Planta } from "../../../interfaces/PlantaInterface";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext/context";

export const CadastroPlanta = () => {
    const navigate = useNavigate();
    const { cadastrarPlanta } = plantaService();
    const { user } = useContext(UserContext);

    const cadastrar: SubmitHandler<Planta> = data => {
        if (user.isAdmin === true) {
            cadastrarPlanta(data, user.userId);

            navigate("/")
        } else {
            alert("Você não pode cadastrar uma planta pois não é um administrador!");
        }
    }

    const cancelaCadastro = () => {
        navigate("/")
    }

    return (
        <Card raised>
            <Grid container direction="row" ml="10%">
                <Grid item width="30%">
                    <Typography
                        ml="15%" mt="15%"
                        fontSize="2.3rem"
                    >
                        Cadastrar uma referência
                    </Typography>
                </Grid>

                <Grid item>
                    <Avatar variant="rounded" sx={{ mt: "5%", width: "13%", height: "66%" }} />
                </Grid>
            </Grid>

            <CardContent>
                <PlantaForm
                    funcaoSubmit={cadastrar}
                    funcaoVoltar={cancelaCadastro}
                    nomeBotao="Cadastrar"
                />
            </CardContent>
        </Card>
    )
}
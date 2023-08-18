import { usePlantaContext } from "../../../hooks/usePlantaContext"
import { Avatar, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import plantaPlaceholder from '../../../styles/img-placeholders/planta-placeholder1.avif'

export const PerfilPlanta = () => {
    const { planta } = usePlantaContext();
    const navigate = useNavigate()

    const handleVoltar = () => {
        navigate("/plantas")
    }

    const handleEditar = () => {
        navigate("/plantas/editar")
    }

    const handleDeletar = () => {
        console.log("deleta não :(")
    }

    return (
        <Card raised>
            <CardContent>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Button
                            className='botaoVoltar'
                            variant="contained"
                            sx={{ ml: "5%", mt: "2%" }}
                            onClick={handleVoltar}
                        > Voltar </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography fontSize="2.5rem" textAlign="center" mt="2%" mb="2%"> {planta.nome} </Typography>
                        <Grid container direction="column" ml="10%">
                            <Grid item hidden={planta.nomeCientifico ? true : false}>
                                <Typography fontSize="1.5rem" mb="2%"> Nome científico: {planta.nomeCientifico} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> Tipo de planta: {planta.tipoDePlanta} </Typography>
                            </Grid>

                            <Grid item hidden={planta.descricao ? true : false}>
                                <Typography fontSize="1.5rem" mb="2%">
                                    Descrição: {planta.descricao}
                                </Typography>
                            </Grid>

                            <Grid item mt="8%" ml="22%" mb="3%">
                                <Grid container direction="row" spacing={4}>
                                    <Grid item>
                                        <Button
                                            className='botaoEditar'
                                            variant="contained"
                                            color='primary'
                                            onClick={handleEditar}
                                        > Editar </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleDeletar}
                                        > Deletar </Button>
                                    </Grid>
                                </Grid>
                                <Outlet />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Avatar variant="rounded" src={planta.imagemReferencia ?? plantaPlaceholder}
                            sx={{ height: "75%", width: "45%", ml: "40%", mt: "5%", mb: "10%" }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import vovoJuju from '../../styles/user-pic/vovojuju.png'
import { UserContext } from '../../context/UserContext/context';
import { useContext } from 'react';
import './index.css'
import { Outlet, useNavigate } from 'react-router-dom';

export const Perfil = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate("/home");
    }

    const handleEditar = () => {
        navigate("/perfil/editar");
    }

    const handleDeletar = () => {
        alert("Tem certeza que deseja deletar sua conta?");
    }

    return (
        <Card raised sx={{ width: "85%", ml: "7%", mt: "5%" }}>
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
                        <Typography fontSize="2.5rem" textAlign="center" mt="2%" mb="2%"> Perfil </Typography>
                        <Grid container direction="column" ml="10%">
                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> Primeiro nome: {user.primeiroNome} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> Último nome: {user.ultimoNome} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> Username: {user.username} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem"> E-mail: {user.email} </Typography>
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
                        <Avatar variant="rounded" src={vovoJuju}
                            sx={{ height: "75%", width: "45%", ml: "40%", mt: "5%", mb: "10%" }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
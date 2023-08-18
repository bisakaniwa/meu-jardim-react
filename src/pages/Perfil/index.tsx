import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import vovoJuju from '../../styles/user-pic/vovojuju.png'
import { UserContext } from '../../context/UserContext/context';
import { useContext } from 'react';
import './index.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebase-config';

export const Perfil = () => {
    const { user } = useContext(UserContext);
    const usuario = firebaseAuth.currentUser;
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


    // TODO: inserir mais informações advindas do auth
    
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
                                <Typography fontSize="1.5rem" mb="2%"> Nome de usuário: {usuario?.displayName} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> E-mail: {usuario?.email} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%">
                                    E-mail verificado: {usuario?.emailVerified ? "Sim" : "Não"}
                                </Typography>
                            </Grid>

                            <Grid item hidden>
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
                                            disabled
                                        > Editar </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={handleDeletar}
                                            disabled
                                        > Deletar </Button>
                                    </Grid>
                                </Grid>
                                <Outlet />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Avatar variant="rounded" src={usuario?.photoURL ?? vovoJuju}
                            sx={{ height: "75%", width: "45%", ml: "40%", mt: "5%", mb: "10%" }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
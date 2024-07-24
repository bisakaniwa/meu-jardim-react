import { Avatar, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import './index.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/configureStore';
import { connect, ConnectedProps } from 'react-redux';
import { ReduxUser } from '../../interfaces/ReduxInterfaces';
import vovoJuju from '../../styles/user-pic/vovojuju.png';

const mapStateToProps = (state: RootState) => ({
    user: state.user.userData,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CombinedProps = PropsFromRedux & { user: ReduxUser };

const VerPerfil = ({ user }: CombinedProps) => {
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
                            color="success"
                            variant="contained"
                            sx={{ ml: "5%", mt: "2%" }}
                            onClick={handleVoltar}
                        > Voltar </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography fontSize="2.5rem" textAlign="center" mt="2%" mb="2%"> Perfil </Typography>
                        <Grid container direction="column" ml="10%">
                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> Nome de usuário: {user?.displayName} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%"> E-mail: {user?.email} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography fontSize="1.5rem" mb="2%">
                                    E-mail verificado: {user?.emailVerified ? "Sim" : "Não"}
                                </Typography>
                            </Grid>

                            <Grid item hidden>
                                <Typography fontSize="1.5rem"> E-mail: {user?.email} </Typography>
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
                        <Avatar variant="rounded" src={user?.photoURL ?? vovoJuju}
                            sx={{ height: "75%", width: "45%", ml: "40%", mt: "5%", mb: "10%" }} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
};

export const Perfil = connector(VerPerfil);
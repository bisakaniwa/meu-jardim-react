// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext/context"
import { Avatar, Box, Grid, Typography } from '@mui/material'
import happySucculent from '../../styles/icons/happy-succulent.png'
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../service/auth/AuthProvider";
import './index.css'
import { firebaseAuth } from '../../config/firebase-config';

export const Home = () => {
    const { sair } = AuthProvider();
    const navigate = useNavigate();
    const user = firebaseAuth.currentUser;

    const handleSair = () => {
        sair();
        navigate("/")
    }

    return (
        <Box>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                    <Grid container direction="column">
                        <Grid item>
                            <Avatar src={happySucculent} variant="rounded"
                                sx={{ width: "20%", height: "30%", ml: "25%", mt: "8%" }} />
                        </Grid>

                        <Grid item>
                            <Typography sx={{ fontSize: "2rem", ml: "5%", mt: "5%", width: "60%", textAlign: "center" }}>
                                Bem vindo(a) de volta, <br />
                                {user?.displayName ?? "jardineiro(a)"}!
                            </Typography>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%", mt: "3%" }}>
                            <Link className="links-home" to="/perfil"> Ver perfil </Link>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%" }}>
                            <Link className="links-home" to="/plantas"> Ver suas plantas </Link>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%" }}>
                            <Link className="links-home" to="/plantas/cadastrar"> Adicionar uma planta </Link>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%" }}>
                            <Typography
                                onClick={handleSair}
                                sx={{
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    fontSize: "1.5rem",
                                    color: "green",
                                    ml: "12%"
                                }}
                            >
                                Sair
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container direction="column">
                        <Grid item xs={12}>
                            <Typography fontSize="2rem" textAlign="center" mt="3%"> Suas plantas favoritas: </Typography>
                        </Grid>
                        {/* faz um get e um map */}
                        <Grid item xs={4} spacing={2}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}
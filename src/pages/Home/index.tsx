import { useContext } from "react";
import { UserContext } from "../../context/UserContext/context"
import { Avatar, Box, Grid, Typography } from '@mui/material'
import happySucculent from '../../styles/icons/happy-succulent.png'
import { Link } from "react-router-dom";
import './index.css'

export const Home = () => {
    const { user } = useContext(UserContext);

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
                                Bem vindo(a) de volta, <br/>
                                {user.primeiroNome}!
                            </Typography>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%", mt: "3%" }}>
                            <Link className="links-home" to="/perfil"> Ver perfil </Link>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%" }}>
                            <Link className="links-home" to="/plantas/todas"> Ver suas plantas </Link>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%" }}>
                            <Link className="links-home" to="/plantas/adicionar"> Adicionar uma planta </Link>
                        </Grid>

                        <Grid item sx={{ width: "60%", textAlign: "center", mb: "1%" }}>
                            <Link className="links-home" to="/"> Sair </Link>
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
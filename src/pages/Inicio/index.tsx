import { Avatar, Grid, Typography } from '@mui/material';
import './index.css';
import welcomeCactus from '../../styles/icons/welcomeCactus.png'
import { LoginFirebase } from '../../components/LoginFirebase';

export const Inicio = () => {

    return (
        <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs={6}>
                <Grid container
                    direction="column"
                    spacing={2}
                    mt="15%"
                    alignItems="center"
                >
                    <Grid item justifyContent="center" display="flex">
                        <Avatar
                            src={welcomeCactus}
                            variant='rounded'
                            sx={{ width: "25%", height: "35%" }}
                        />
                    </Grid>
                    <Grid item width="fit-content">
                        <Typography className='boas-vindas'> Bem-vindo(a) de volta! </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <LoginFirebase />
            </Grid>
        </Grid>
    )
}
import { Avatar, Grid, Typography } from '@mui/material';
import './index.css';
import { Login } from '../../components/Login';
import welcomeCactus from '../../styles/icons/welcomeCactus.png'

export const Inicio = () => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
                <Grid container
                    direction="column"
                    spacing={2}
                    ml="19%" mt="15%"
                >
                    <Grid item ml="15%">
                        <Avatar
                            src={welcomeCactus}
                            variant='rounded'
                            sx={{ width: "20%", height: "30%" }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography className='boas-vindas'> Bem-vindo(a) de volta! </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6}>
                <Login />
            </Grid>
        </Grid>
    )
}
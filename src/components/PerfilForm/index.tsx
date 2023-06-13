import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Grid, TextField } from '@mui/material'
import './index.css'
import { useNavigate } from 'react-router-dom';
import { UserPerfil } from '../../interfaces/UserInterface';
import { ChangeEvent } from 'react';

type PerfilFormType = {
    setSenhaConfirmada: React.Dispatch<React.SetStateAction<string>>;
    funcaoSubmit: SubmitHandler<UserPerfil>;
    tituloBotao: string;
}

export const PerfilForm = ({ setSenhaConfirmada, funcaoSubmit, tituloBotao }: PerfilFormType) => {
    const { register, handleSubmit } = useForm<UserPerfil>();
    const navigate = useNavigate();

    const handleSenhaConfirmada = (event: ChangeEvent<HTMLInputElement>) => {
        setSenhaConfirmada(event.target.value)
    }

    const voltarHome = () => {
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit(funcaoSubmit)}>
            <Grid container direction="row" ml="5%" mt="1%">
                <Grid item xs={6}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Primeiro nome*"
                                {...register("primeiroNome", { required: true })}
                                sx={{ width: "80%" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Último nome"
                                {...register("ultimoNome")}
                                sx={{ width: "80%" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Username*"
                                {...register("username", { required: true })}
                                sx={{ width: "80%" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container direction="column" spacing={3}>
                        <Grid item>
                            <TextField
                                type="email"
                                variant="outlined"
                                label="E-mail*"
                                {...register("email", { required: true })}
                                sx={{ width: "80%" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                type="password"
                                variant="outlined"
                                label="Senha*"
                                {...register("senha", { required: true })}
                                sx={{ width: "80%" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                type="password"
                                variant="outlined"
                                label="Confirme sua senha*"
                                onChange={handleSenhaConfirmada}
                                sx={{ width: "80%" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container
                direction="row"
                justifyContent="flex-end"
                mt="3%" mb="0.5%"
            >
                <Button
                    type="submit"
                    variant="contained"
                    className='botaoCadastrar'
                >
                    {tituloBotao}
                </Button>

                <Button
                    onClick={voltarHome}
                    className='botaoCancelar'
                    variant='contained'
                    color='error'
                >
                    Cancelar
                </Button>
            </Grid>
        </form>
    )
}
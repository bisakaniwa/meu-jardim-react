import { Avatar, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import succulent from '../../styles/icons/succulent.png'
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginInterface } from "../../interfaces/AuthInterface"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { AuthProvider } from "../../service/auth/AuthProvider"

export const CadastroFirebase = () => {
    const { register, handleSubmit } = useForm<LoginInterface>()
    const { cadastrar } = AuthProvider();
    const navigate = useNavigate();
    const [confirmaSenha, setConfirmaSenha] = useState<string>()

    const funcaoCadastrar: SubmitHandler<LoginInterface> = (data: LoginInterface) => {
        if (data.password === confirmaSenha) {
            cadastrar(data.email, data.password)
        } else {
            alert("As senhas não são iguais!")
        }
    }

    const funcaoVoltar = () => {
        navigate("/")
    }

    const campoConfirmaSenha = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmaSenha(event.target.value)
    }

    return (
        <Card raised sx={{ width: "80%", mt: "5%", ml: "10%" }}>
            <Grid container direction="row" ml="10%">
                <Grid item width="30%">
                    <Typography
                        ml="15%" mt="15%"
                        fontSize="2.3rem"
                    >
                        Cadastre-se!
                    </Typography>
                </Grid>

                <Grid item>
                    <Avatar src={succulent} variant="rounded" sx={{ mt: "6%", width: "13%", height: "66%" }} />
                </Grid>
            </Grid>

            <CardContent>
                <form onSubmit={handleSubmit(funcaoCadastrar)}>
                    <Grid container direction="row" ml="5%" mt="1%">
                        <Grid item xs={6}>
                            <Grid container direction="column" spacing={3}>

                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        label="E-mail"
                                        {...register("email", { required: true })}
                                        sx={{ width: "80%" }}
                                    />
                                </Grid>

                                <Grid item>
                                    <TextField
                                        variant="outlined"
                                        label="Senha"
                                        type="password"
                                        {...register("password")}
                                        sx={{ width: "80%" }}
                                    />
                                </Grid>

                                <Grid item xs={8}>
                                    <TextField
                                        type="password"
                                        variant="outlined"
                                        label="Confirme sua senha"
                                        required
                                        onChange={campoConfirmaSenha}
                                        sx={{ mb: 2, width: "80%" }}
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
                            Cadastrar
                        </Button>

                        <Button
                            onClick={funcaoVoltar}
                            className='botaoCancelar'
                            variant='contained'
                            color='error'
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </form>

            </CardContent>
        </Card >
    )
}
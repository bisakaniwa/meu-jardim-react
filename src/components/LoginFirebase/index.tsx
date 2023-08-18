import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInterface } from "../../interfaces/AuthInterface";
import { AuthProvider } from "../../service/auth/AuthProvider";
import { ChangeEvent, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import './index.css';
import { useNavigate } from "react-router-dom";

export const LoginFirebase = () => {
    const { register, handleSubmit } = useForm<LoginInterface>();
    const { redefinirSenha, loginEmailSenha, loginGoogle } = AuthProvider();
    const [open, setOpen] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const navigate = useNavigate()


    const login: SubmitHandler<LoginInterface> = (data: LoginInterface) => {
        loginEmailSenha(data.email, data.password);
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handleRedefineSenha = () => {
        redefinirSenha(email)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleLoginGoogle = () => {
        loginGoogle()
    }

    const handleCadastro = () => {
        navigate("/cadastro-firebase")
    }

    return (
        <Card raised sx={{ width: "65%", mt: "15%", ml: "3%" }}>
            <Typography textAlign={"center"} className='tituloLogin'> Login </Typography>
            <CardContent sx={{ mb: "3%" }}>

                <form onSubmit={handleSubmit(login)}>
                    <Grid container direction="column" alignContent="center">
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                label="E-mail"
                                {...register("email", { required: true })}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                type="password"
                                variant="outlined"
                                label="Senha"
                                {...register("password", { required: true })}
                                sx={{ mb: 2 }}
                            />
                        </Grid>

                        <Grid item sx={{ textAlign: "start", mb: 1, ml: 1.2 }}>
                            <Typography
                                onClick={handleOpen}
                                sx={{ cursor: "pointer", textDecoration: "underline" }}
                            >
                                Esqueci minha senha.
                            </Typography>
                        </Grid>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>
                                Digite seu e-mail cadastrado para que possamos enviar um link de recuperação de senha para você!
                            </DialogTitle>

                            <DialogContent>
                                <TextField
                                    variant="standard"
                                    type="email"
                                    label="Insira seu e-mail"
                                    required
                                    onChange={handleEmail}
                                    sx={{ width: "20vw" }}
                                />

                                <Button
                                    sx={{ ml: "15%" }}
                                    type="submit"
                                    variant="contained"
                                    onClick={handleRedefineSenha}
                                >
                                    Enviar
                                </Button>

                            </DialogContent>
                        </Dialog>

                        <Grid item sx={{ textAlign: "start", mb: 2, ml: 1.2 }}>
                            <Typography
                                onClick={handleCadastro}
                                sx={{ cursor: "pointer", textDecoration: "underline" }}
                            >
                                Ainda não tem um cadastro?
                            </Typography>
                        </Grid>

                        <Grid item ml="16%">
                            <Button
                                className="botaoLogin"
                                type="submit"
                                variant="contained"
                                color="success"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Grid container alignContent="center" direction="column" mt="5%">
                    <Grid item>
                        <Typography> Fazer login usando: </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justifyContent="center">
                            <Grid item>
                                <IconButton onClick={handleLoginGoogle}>
                                    <Tooltip title="Google">
                                        <GoogleIcon />
                                    </Tooltip>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
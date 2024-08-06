import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInterface } from "../../interfaces/AuthInterface";
import { AuthProvider } from "../../service/auth/AuthProvider";
import { ChangeEvent, useEffect, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import './index.css';
import { useNavigate } from "react-router-dom";
import { EMAIL_PATTERN } from "../../static/regexPatterns";
import { ModalAviso } from "../ModalAviso";
import { useUserDispatch, useUserSelector } from "../../redux/configureStore";
import { appInitialState, clearOnLogout } from "../../redux/user";

export const LoginFirebase = () => {
    const { register, handleSubmit, formState } = useForm<LoginInterface>({ reValidateMode: "onSubmit" });
    const { errors } = formState;
    const { redefinirSenha, loginEmailSenha, loginGoogle } = AuthProvider();
    const [isModalAberto, setIsModalAberto] = useState<boolean>(false);
    const [recuperarEmail, setRecuperarEmail] = useState<string>("");
    const [isFeedbackAberto, setIsFeedbackAberto] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>("");
    const navigate = useNavigate();
    const userToken = useUserSelector(state => state.user.userToken.currentToken);
    const dispatch = useUserDispatch();

    useEffect(() => {
        if (userToken && userToken !== ("" && undefined)) {
            alert("Você está prestes a sair da sua conta.");
            dispatch(clearOnLogout(appInitialState));
        }
    }, [])

    const login: SubmitHandler<LoginInterface> = async (data: LoginInterface) => {
        await loginEmailSenha(data.email, data.password);
    };

    const handleAbrirModal = () => {
        setIsModalAberto(true);
    };

    const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setRecuperarEmail(event.target.value);
    };

    const handleRedefineSenha = async () => {
        await redefinirSenha(recuperarEmail).then(() => {
            setMensagemModal("E-mail enviado com sucesso!");
        }).catch((error) => {
            console.log(error);
            setMensagemModal("Falha ao enviar e-mail.");
        }).finally(() => setIsFeedbackAberto(true));
    };

    const handleFecharModal = () => {
        setIsModalAberto(false);
    };

    const handleLoginGoogle = async () => {
        await loginGoogle();
    };

    const handleCadastro = () => {
        navigate("/cadastro");
    };

    return (
        <Card raised sx={{ width: "65%", mt: "15%", ml: "3%", maxWidth: "402px" }}>
            <Typography textAlign={"center"} className='tituloLogin'> Login </Typography>
            <CardContent sx={{ mb: "3%" }}>
                <form onSubmit={handleSubmit(login)}>
                    <Grid container direction="column" alignContent="center">
                        <Grid item xs={8}>
                            <TextField
                                variant="outlined"
                                label="E-mail"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Campo obrigatório!"
                                    },
                                    pattern: {
                                        value: new RegExp(EMAIL_PATTERN),
                                        message: "Insira um e-mail válido!"
                                    },
                                })}
                                sx={{ mb: 2 }}
                                error={!!errors?.email}
                                helperText={errors?.email && <span color="red"> {errors?.email?.message?.toString()} </span>}
                            />
                        </Grid>

                        <Grid item xs={8}>
                            <TextField
                                type="password"
                                variant="outlined"
                                label="Senha"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Campo obrigatório!"
                                    },
                                })}
                                sx={{ mb: 2 }}
                                error={!!errors?.password}
                                helperText={errors?.password && <span color="red"> {errors?.email?.message?.toString()} </span>}
                            />
                        </Grid>

                        <Grid item sx={{ textAlign: "center", mb: 1, ml: 1.2 }}>
                            <Typography
                                onClick={handleAbrirModal}
                                sx={{ cursor: "pointer", textDecoration: "underline" }}
                            >
                                Esqueci minha senha
                            </Typography>
                        </Grid>

                        <Dialog open={isModalAberto} onClose={handleFecharModal} fullWidth maxWidth="xs">
                            <DialogTitle>
                                Digite seu e-mail cadastrado:
                            </DialogTitle>

                            <DialogContent>
                                <Grid container direction="row" width="395px" justifyContent="space-between" alignItems="end">
                                    <Grid item>
                                        <TextField
                                            variant="standard"
                                            type="email"
                                            label="Insira seu e-mail"
                                            required
                                            onChange={handleEmail}
                                            sx={{ width: "22vw" }}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            onClick={handleRedefineSenha}
                                        >
                                            Enviar
                                        </Button>
                                    </Grid>
                                </Grid>

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

                        <Grid item ml="20%">
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

            <ModalAviso
                isAberto={isFeedbackAberto}
                handleFechar={() => setIsFeedbackAberto(false)}
                textoPrincipal={mensagemModal}
                textoBotao="Fechar"
                acaoBotao={() => setIsFeedbackAberto(false)}
            />
        </Card >
    )
}
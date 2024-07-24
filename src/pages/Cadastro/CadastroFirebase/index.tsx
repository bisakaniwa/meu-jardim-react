import { Avatar, Box, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import succulent from '../../../styles/icons/succulent.png'
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginInterface } from "../../../interfaces/AuthInterface"
import { useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { AuthProvider } from "../../../service/auth/AuthProvider"
import { EMAIL_PATTERN } from "../../../static/regexPatterns"
import { ModalAviso } from "../../../components/ModalAviso"

export const CadastroFirebase = () => {
    const { register, handleSubmit, formState } = useForm<LoginInterface>({ reValidateMode: "onSubmit" });
    const { errors } = formState;
    const { cadastrar } = AuthProvider();
    const navigate = useNavigate();
    const [confirmaSenha, setConfirmaSenha] = useState<string>();
    const [senhasDiferentes, setSenhasDiferentes] = useState<boolean>(false);
    const [isModalAberto, setIsModalAberto] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>("");

    const funcaoCadastrar: SubmitHandler<LoginInterface> = async (data: LoginInterface) => {
        if (data.password === confirmaSenha) {
            setSenhasDiferentes(false);
            await cadastrar(data.email, data.password).then(() => {
                setMensagemModal("Cadastro realizado com sucesso!");
            }).catch((error) => {
                if (error.code === "auth/weak-password") {
                    setMensagemModal("Sua senha deve ter pelo menos 6 caracteres!");
                } else if (error.code === "auth/email-already-in-use") {
                    setMensagemModal("Esse e-mail já está cadastrado! Recupere sua senha clicando abaixo ou tente logar de outra forma.");
                } else {
                    setMensagemModal("Algo deu errado no seu cadastro...");
                }
                console.log(error);
            }).finally(() => setIsModalAberto(true));
        } else {
            setSenhasDiferentes(true);
        }
    }

    const funcaoVoltar = () => {
        navigate("/")
    }

    const campoConfirmaSenha = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmaSenha(event.target.value)
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Card raised sx={{ width: "50%", mt: "10%", pb: "2%" }}>
                <Grid container direction="row" ml="10%">
                    <Grid item xs={6}>
                        <Typography
                            ml="15%" mt="15%" pl="8%"
                            fontSize="2.3rem"
                        >
                            Cadastre-se!
                        </Typography>
                    </Grid>

                    <Grid item xs={6} pl="5%" width="fitContent" height="fitContent">
                        <Avatar src={succulent} variant="rounded" sx={{ mt: "10%", width: "25.4%", height: "70%", maxWidth: "95px", maxHeight: "95px" }} />
                    </Grid>
                </Grid>

                <CardContent>
                    <form onSubmit={handleSubmit(funcaoCadastrar)}>
                        <Grid container direction="row" justifyContent="center" mt="1%">
                            <Grid item xs={6}>
                                <Grid container direction="column" spacing={3}>

                                    <Grid item>
                                        <TextField
                                            variant="outlined"
                                            label="E-mail*"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Campo obrigatório!",
                                                },
                                                pattern: {
                                                    value: new RegExp(EMAIL_PATTERN),
                                                    message: "Insira um e-mail válido!",
                                                },
                                            })}
                                            fullWidth
                                            error={!!errors?.email}
                                            helperText={errors?.email && <span color="red"> {errors?.email?.message?.toString()} </span>}
                                        />
                                    </Grid>

                                    <Grid item>
                                        <TextField
                                            variant="outlined"
                                            label="Senha*"
                                            type="password"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: "Campo obrigatório!",
                                                },
                                            })}
                                            fullWidth
                                            error={!!errors?.password}
                                            helperText={errors?.password && <span color="red"> {errors?.password?.message?.toString()} </span>}
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
                                        <TextField
                                            type="password"
                                            variant="outlined"
                                            label="Confirme sua senha"
                                            required
                                            onChange={campoConfirmaSenha}
                                            sx={{ mb: 2 }}
                                            fullWidth
                                            error={senhasDiferentes}
                                            helperText={senhasDiferentes && <span color="red"> As senhas não são iguais! </span>}
                                        />
                                    </Grid>

                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container
                            direction="row"
                            justifyContent="center"
                            mt="3%" mb="1.5%"
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
                                Voltar
                            </Button>
                        </Grid>
                    </form>

                </CardContent>
            </Card>

            <ModalAviso
                isAberto={isModalAberto}
                handleFechar={() => setIsModalAberto(false)}
                textoPrincipal={mensagemModal}
                textoBotao="Ok"
                acaoBotao={() => navigate("/home")}
            />
        </Box>
    )
}
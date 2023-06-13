import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import { PerfilForm } from '../../components/PerfilForm'
import succulent from '../../styles/icons/succulent.png'
import { SubmitHandler } from 'react-hook-form'
import { UserPerfil } from '../../interfaces/UserInterface'
import { cadastroService } from '../../service/cadastroPost'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export const Cadastro = () => {
    const { cadastrar } = cadastroService();
    const navigate = useNavigate();
    const [senhaConfirmada, setSenhaConfirmada] = useState<string>("");

    const cadastrarUsuario: SubmitHandler<UserPerfil> = data => {
        if (validaSenha(data.senha)) {
            cadastrar(data);
            navigate("/");
        } else {
            alert("As senhas não são iguais!");
        }
    };

    const validaSenha = (senha: string) => {
        if (senhaConfirmada === senha) {
            return true
        }
        return false
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
                    <Avatar src={succulent} variant="rounded" sx={{ mt: "5%", width: "13%", height: "66%" }} />
                </Grid>
            </Grid>

            <CardContent>
                <PerfilForm
                    setSenhaConfirmada={setSenhaConfirmada}
                    funcaoSubmit={cadastrarUsuario}
                    tituloBotao='Cadastrar'
                />
            </CardContent>
        </Card>
    )
}
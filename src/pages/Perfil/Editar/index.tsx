import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import { useState } from "react"
import { PerfilForm } from "../../../components/PerfilForm"
import succulent from '../../../styles/icons/succulent.png'
import { UserPerfil } from "../../../interfaces/UserInterface";
import { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { perfilService } from '../../../service/back-Java/perfilService';
import { useUserContext } from '../../../hooks/useUserContext';

// TODO: atualizar para firebase

export const Editar = () => {
    const navigate = useNavigate();
    const { editarPerfil } = perfilService();
    const [senhaConfirmada, setSenhaConfirmada] = useState<string>("");
    const [user, { setPrimeiroNome, setUltimoNome, setUsername, setEmail, setSenha }] = useUserContext();

    const editarUsuario: SubmitHandler<UserPerfil> = data => {
        if (validaSenha(data.senha)) {
            editarPerfil(data);
            // if sucesso
            setPrimeiroNome(data.primeiroNome);
            setUltimoNome(data.ultimoNome);
            setUsername(data.username);
            setEmail(data.email);
            setSenha(data.senha);
            navigate("/perfil");
        } else {
            alert("As senhas não são iguais!")
        }
    }

    const validaSenha = (senha: string) => {
        if (senhaConfirmada === senha) {
            return true
        }
        return false
    }

    const voltarPerfil = () => {
        navigate("/perfil")
    }

    // TODO: possibilitar a inserção de novas informações, registrar no firestore e exibir na página de perfil

    return (
        <Card raised sx={{ width: "80%", mt: "5%", ml: "10%" }}>
            <Grid container direction="row" ml="10%">
                <Grid item width="30%">
                    <Typography
                        ml="15%" mt="15%"
                        fontSize="2.3rem"
                    >
                        Editar perfil
                    </Typography>
                </Grid>

                <Grid item>
                    <Avatar src={succulent} variant="rounded" sx={{ mt: "5%", width: "13%", height: "66%" }} />
                </Grid>
            </Grid>

            <CardContent>
                <PerfilForm
                    setSenhaConfirmada={setSenhaConfirmada}
                    funcaoSubmit={editarUsuario}
                    tituloBotao="Concluir"
                    funcaoVoltar={voltarPerfil}
                    user={user}
                />
            </CardContent>
        </Card>
    )
}
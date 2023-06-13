import { useContext, useEffect, useState } from "react"
import { PerfilForm } from "../../../components/PerfilForm"
import { UserContext } from "../../../context/UserContext/context";
import { UserPerfil } from "../../../interfaces/UserInterface";
import { SubmitHandler } from 'react-hook-form'

export const Editar = () => {
    const { user } = useContext(UserContext);
    const [senhaConfirmada, setSenhaConfirmada] = useState<string>("");

    const editarUsuarioSemSenha: SubmitHandler<UserPerfil> = data => {
        // metodo do service
    }

    const validaSenha = (senha: string) => {
        if (senhaConfirmada === senha) {
            return true
        }
        return false
    }

    return (
        <>
            <PerfilForm
                setSenhaConfirmada={setSenhaConfirmada}
                funcaoSubmit={() => { }}
                tituloBotao="Concluir"
            />
        </>
    )
}
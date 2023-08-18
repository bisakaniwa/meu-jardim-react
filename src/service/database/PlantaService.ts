import { database, firebaseAuth } from "../../config/firebase-config";
import { ref, push, remove, update, onValue, query, orderByChild, set } from 'firebase/database'
import { Planta } from "../../interfaces/PlantaInterface";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFirebaseUserContext } from "../../hooks/useFirebaseUserContext";

export const PlantaService = () => {
    const { user } = useFirebaseUserContext()
    // const user = firebaseAuth.currentUser;
    const navigate = useNavigate()
    const plantaDb = ref(database, "users/" + user?.uid + "/plantas")
    const [listaPlantas, setListaPlantas] = useState<Planta[]>([])
    const [listaFotos, setListaFotos] = useState<[]>([])

    const cadastrarPlanta = async (planta: Planta) => {

        return push(plantaDb, {
            nome: planta.nome,
            nomeCientifico: planta.nomeCientifico,
            tipoDePlanta: planta.tipoDePlanta,
            imagemReferencia: planta.imagemReferencia,
            descricao: planta.descricao,

        })
            .then(() => navigate("/home"))
            .catch((error) => console.log(error))
    }

    const editarPlanta = async (plantaId: string, dadosAtualizados: Planta) => {
        return update(ref(database, `users/${user?.uid}/plantas/${plantaId}`), {
            nome: dadosAtualizados.nome,
            nomeCientifico: dadosAtualizados?.nomeCientifico,
            tipoDePlanta: dadosAtualizados.tipoDePlanta,
            imagemReferencia: dadosAtualizados?.imagemReferencia,
            descricao: dadosAtualizados?.descricao,
        })
            .then(() => {
                alert(`${dadosAtualizados.nome} foi atualizada com sucesso!`);
                navigate("/plantas")
            })
            .catch((error) => { console.log(error); alert("Ops! Algo deu errado!") })
    }

    // TODO: adicionar observer .on()/.onValue() para fazer a atualização da página em tempo real
    const excluirPlanta = async (plantaId: string) => {
        return remove(ref(database, `users/${user?.uid}/plantas/${plantaId}`))
            .catch((error) => {
                alert("Ops! Algo deu errado ao tentar excluir sua planta.")
                console.log(error)
            })
    }

    const buscarEmTempoReal = async () => {
        return onValue(ref(database, `users/${user?.uid}/plantas`), (listaObtida) => {
            let lista: Planta[] = [];
            listaObtida.forEach((planta) => {
                let key = planta.key;
                let data = planta.val();
                lista.push({
                    plantaId: key,
                    nome: data.nome,
                    nomeCientifico: data?.nomeCientifico,
                    tipoDePlanta: data.tipoDePlanta,
                    imagemReferencia: data?.imagemReferencia,
                    descricao: data?.descricao,
                });
            });
            setListaPlantas(lista)
        }, (error: Error) => console.log(error)), firebaseAuth.currentUser
    }

    const pesquisarPlantas = (plantaPesquisada: string) => {
        const resultado = query(ref(database, `users/${user?.uid}/plantas`), orderByChild(plantaPesquisada));
        return resultado;
    }

    const addFotoPlanta = async (planta: Planta, urlDaFoto: string) => {
        return push(ref(database, `users/${user?.uid}/plantas/${planta?.plantaId}/minhaPlanta`), {
            urlDaFoto: urlDaFoto
        }).then(() => console.log("adicionado"))
            .catch((error) => console.log(error))
    }

    const buscarFotosMinhaPlanta = (planta: Planta) => {
        return onValue(ref(database, `users/${user?.uid}/plantas/${planta.plantaId}/minhaPlanta`), (listaObtida) => {
            let lista: any = []
            listaObtida.forEach((planta) => {
                let objeto = planta.val()
                lista.push(
                    objeto.urlDaFoto
                )
            });
            setListaFotos(lista)
        }, (error: Error) => console.log(error)), firebaseAuth.currentUser
    }

    return {
        cadastrarPlanta, editarPlanta, excluirPlanta, pesquisarPlantas, listaPlantas, buscarEmTempoReal, addFotoPlanta,
        buscarFotosMinhaPlanta, listaFotos
    }
}
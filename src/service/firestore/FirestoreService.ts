import { addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { firestore } from "../../config/firebase-config"
import { Planta } from "../../interfaces/PlantaInterface";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { getUserData } from "../../redux/configureStore";

export const FirestoreService = () => {
    const navigate = useNavigate()
    const [listaPlantas, setListaPlantas] = useState<Planta[]>([]);
    const [listaFotos, setListaFotos] = useState<[]>([]);

    const cadastrarPlanta = async (planta: Planta, userId: string) => {
        const dbRef = collection(firestore, `users/${userId}/plantas`);
        await addDoc(dbRef, {
            nome: planta.nome,
            nomeCientifico: planta.nomeCientifico,
            tipoDePlanta: planta.tipoDePlanta,
            imagemReferencia: planta.imagemReferencia,
            descricao: planta.descricao,
            minhaPlanta: []
        })
            .then(() => navigate("/plantas"))
            .catch((error) => {
                alert("Ops! Algo deu errado ao tentar cadastrar sua planta, tente novamente.")
                console.log(error)
            })
    }

    const editarPlanta = async (dadosAtualizados: Planta, userId: string) => {
        await updateDoc(doc(firestore, `users/${userId}/plantas/${dadosAtualizados.plantaId}`), {
            plantaId: dadosAtualizados.plantaId,
            nome: dadosAtualizados.nome,
            nomeCientifico: dadosAtualizados?.nomeCientifico,
            tipoDePlanta: dadosAtualizados.tipoDePlanta,
            imagemReferencia: dadosAtualizados?.imagemReferencia,
            descricao: dadosAtualizados?.descricao,
        })
            .then(() => navigate("/plantas"))
            .catch((error) => {
                alert("Ops! Algo de errado aconteceu ao tentar editar sua planta, tente novamente.")
                console.log(error)
            })
    }

    const verPlantas = async (userId: string) => {
        const dbRef = collection(firestore, `users/${userId}/plantas`);
        const plantaQuery = query(dbRef);
        onSnapshot(plantaQuery, (resultadoLista) => {
            const lista: Planta[] = [];
            resultadoLista.forEach((objeto) => {
                let id = objeto.id
                let planta = objeto.data()
                lista.push({
                    plantaId: id,
                    nome: planta.nome,
                    nomeCientifico: planta?.nomeCientifico,
                    tipoDePlanta: planta.tipoDePlanta,
                    imagemReferencia: planta?.imagemReferencia,
                    descricao: planta?.descricao
                })
            })
            setListaPlantas(lista);
        }, (error) => console.log(error.code))
    }

    const excluirPlanta = async (plantaId: string, userId: string) => {
        await deleteDoc(doc(firestore, `users/${userId}/plantas/${plantaId}`))
            // TODO: excluir as coleções derivadas desse doc
            .catch((error) => {
                alert("Ops! Algo deu errado ao tentar excluir sua planta, tente novamente.")
                console.log(error)
            })
    }

    const addFotoPlanta = async (planta: Planta, urlDaFoto: string, userId: string) => {
        await updateDoc(doc(firestore, `users/${userId}/plantas/${planta?.plantaId}`), {
            minhaPlanta: arrayUnion(urlDaFoto)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    const buscarFotosMinhaPlanta = async (planta: Planta, userId: string) => {
        onSnapshot(doc(firestore, `users/${userId}/plantas/${planta?.plantaId}`),
            (perfil) => {
                const arrayMinhaPlanta = perfil.data()?.minhaPlanta;
                setListaFotos(arrayMinhaPlanta)
            },
            (error) => console.log(error))
    }

    return { cadastrarPlanta, editarPlanta, verPlantas, listaPlantas, excluirPlanta, addFotoPlanta, buscarFotosMinhaPlanta, listaFotos }
}
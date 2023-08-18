import { addDoc, arrayUnion, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore"
import { firebaseAuth, firestore } from "../../config/firebase-config"
import { Planta } from "../../interfaces/PlantaInterface";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export const FirestoreService = () => {
    const user = firebaseAuth.currentUser;
    const dbRef = collection(firestore, `users/${user?.uid}/plantas`);
    const navigate = useNavigate()
    const [listaPlantas, setListaPlantas] = useState<Planta[]>([]);
    const [listaFotos, setListaFotos] = useState<[]>([]);

    const cadastrarPlanta = async (planta: Planta) => {
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

    const editarPlanta = async (dadosAtualizados: Planta) => {
        await updateDoc(doc(firestore, `users/${user?.uid}/plantas/${dadosAtualizados.plantaId}`), {
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

    const verPlantas = () => {
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
        }, (error) => console.log(error))
    }

    const excluirPlanta = async (plantaId: string) => {
        await deleteDoc(doc(firestore, `users/${user?.uid}/plantas/${plantaId}`))
            // TODO: excluir as coleções derivadas desse doc
            .catch((error) => {
                alert("Ops! Algo deu errado ao tentar excluir sua planta, tente novamente.")
                console.log(error)
            })
    }

    const addFotoPlanta = async (planta: Planta, urlDaFoto: string) => {
        await updateDoc(doc(firestore, `users/${user?.uid}/plantas/${planta?.plantaId}`), {
            minhaPlanta: arrayUnion(urlDaFoto)
        })
            .catch((error) => {
                console.log(error)
            })
    }

    const buscarFotosMinhaPlanta = async (planta: Planta) => {
        onSnapshot(doc(firestore, `users/${user?.uid}/plantas/${planta?.plantaId}`), 
        (perfil) => {
            const arrayMinhaPlanta = perfil.data()?.minhaPlanta;
            setListaFotos(arrayMinhaPlanta)
        },
            (error) => console.log(error))
    }

    return { cadastrarPlanta, editarPlanta, verPlantas, listaPlantas, excluirPlanta, addFotoPlanta, buscarFotosMinhaPlanta, listaFotos }
}
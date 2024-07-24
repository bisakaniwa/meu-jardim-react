import { UploadTask, deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from 'react'
import { Planta } from "../../interfaces/PlantaInterface";
import { FirestoreService } from "../firestore/FirestoreService";

export const PlantaCloudStorage = () => {
    const storage = getStorage();
    const [progressoUpload, setProgressoUpload] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const { addFotoPlanta } = FirestoreService();

    const uploadFotoMinhaPlanta = (planta: Planta, chaveDaImagem: string, imagem: File, userId: string) => {
        const storageRef = ref(storage, `plantas/${userId}/${planta.nome}/${chaveDaImagem}`);
        const uploadFoto = uploadBytesResumable(storageRef, imagem)

        acompanharUpload(planta, chaveDaImagem, uploadFoto, userId)
    };

    const acompanharUpload = (planta: Planta, chaveDaImagem: string, upload: UploadTask, userId: string) => {
        upload.on('state_changed', (estadoAtual) => {
            const progresso = (estadoAtual.bytesTransferred / estadoAtual.totalBytes) * 100;
            setProgressoUpload(progresso)
        },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        alert("Erro: Você não tem permissão para fazer este upload.")
                        break;
                    case 'storage/cancelled':
                        alert("Erro: Você cancelou o upload.")
                        break;
                    case 'storage/unknown':
                        alert("Ocorreu um erro inesperado, tente novamente.")
                        break;
                    default:
                        alert("Erro no upload.")
                        console.log(error.code + error.message)
                        break;
                }
            },
            () => {
                getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                    addFotoPlanta(planta, downloadURL, userId)
                })

                alert("Upload concluído com sucesso!")
            }
        )
    };

    const pausarUpload = (upload: UploadTask) => {
        upload.pause();
        setIsPaused(true);
    };

    const retomarUpload = (upload: UploadTask) => {
        upload.resume();
        setIsPaused(false);
    };

    const cancelarUpload = (upload: UploadTask) => {
        upload.cancel();
    };

    // const mostrarFotos = async (nomeDaPlanta: string) => {
    //     const caminho = ref(storage, `plantas/${user?.uid}/${nomeDaPlanta}`)
    //     const primeiraPagina = await list(caminho, { maxResults: 100 }).then((listaImagens) => {
    //         let fotos: string[] = [];
    //         listaImagens.items.forEach((imagem) => {

    //         })
    //     });
    // }

    // TODO: ao excluir uma planta, excluir todas as imagens relacionadas a ela
    const excluirImagem = (planta: Planta, urlDaImagem: string, userId: string) => {
        deleteObject(ref(storage, `plantas/${userId}/${planta.nome}/${urlDaImagem}`))
            .then(() => alert("sucesso"))
            .catch((error) => console.log(error))
    };

    return { uploadFotoMinhaPlanta, progressoUpload, isPaused, pausarUpload, retomarUpload, cancelarUpload, excluirImagem }
};
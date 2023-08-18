import { child, get, getDatabase, ref } from "firebase/database";
import { firebaseAuth } from "../../config/firebase-config";
import { Planta } from "../../interfaces/PlantaInterface";
import { useState } from 'react'

export const useBuscarListaPlantas = () => {
    const dbRef = ref(getDatabase())
    const userId = firebaseAuth.currentUser?.uid;
    const [listaPlantas, setListaPlantas] = useState<Planta[]>([])

    const getPlantas = () =>
        get(child(dbRef, `users/${userId}/plantas`)).then((buscaPlantas) => {
            if (buscaPlantas.exists()) {
                let lista: Planta[] = []
                buscaPlantas.forEach((planta) => {
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

            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    return { getPlantas, listaPlantas }
}
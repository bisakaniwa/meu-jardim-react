import { Button, Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import plantaPlaceholder from '../../../styles/img-placeholders/planta-placeholder1.avif'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ModalConfirmacao } from '../../../components/ModalConfirmacao'
import { PlantaService } from '../../../service/database/PlantaService'
import { Planta } from '../../../interfaces/PlantaInterface'
import { usePlantaContext } from '../../../hooks/usePlantaContext'
import { BarraFiltroEPesquisa } from '../../../components/BarraFiltroEPesquisa'
import { FirestoreService } from '../../../service/firestore/FirestoreService';

export const VerPlantas = () => {
    const navigate = useNavigate();
    const [isAberto, setIsAberto] = useState<boolean>(false)
    const { pesquisarPlantas } = PlantaService();
    const { verPlantas, listaPlantas, excluirPlanta } = FirestoreService();
    const [plantaSelecionada, setPlantaSelecionada] = useState<Planta>({} as Planta)
    const { setPlanta } = usePlantaContext();
    const [plantaPesquisada, setPlantaPesquisada] = useState<string>("")

    const handleVoltar = () => {
        navigate("/home")
    }

    const handleAbrir = (planta: Planta) => {
        setIsAberto(true)
        setPlantaSelecionada(planta)
    }

    const handleFechar = () => {
        setIsAberto(false)
    }

    const handleExcluirPlanta = () => {
        excluirPlanta(plantaSelecionada.plantaId!)
        alert(`${plantaSelecionada.nome} foi excluída`)
        setIsAberto(false)
    }

    const handleEditarPlanta = (planta: Planta) => {
        setPlanta(planta)
        navigate("/plantas/editar")
    }

    const handlePesquisarPlanta = () => {
        pesquisarPlantas(plantaPesquisada)
    }

    const handlePaginaDaPlanta = (planta: Planta) => {
        setPlanta(planta)
        navigate("/plantas/minha-planta")
    }

    useEffect(() => {
        verPlantas()
    }, [])

    // TODO: tornar os cards expansivos && criar páginas individuais para as plantas de referência
    // TODO: anexar o delete da planta de referência ao das imagens pessoais adicionadas
    // TODO: plantas preferidas: fotos pessoais, plantas de referência ou ambas?
    
    return (
        <Grid container direction="column" alignContent="center" ml="5%" mt="2%">
            <Grid container direction="row">
                <Grid item mt="1%" mb="1%" ml="2%">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleVoltar}
                    >
                        Voltar
                    </Button>
                </Grid>
                <Grid item width="50vw">
                    <Typography
                        fontSize="2rem"
                        fontWeight="500"
                        ml="35%"
                    >
                        Suas plantas cadastradas:
                    </Typography>
                </Grid>
            </Grid>

            <BarraFiltroEPesquisa
                setPlantaPesquisada={setPlantaPesquisada}
                funcaoPesquisa={handlePesquisarPlanta}
            />

            <Grid item ml="5%">
                <Typography
                    fontSize="1.25rem"
                >
                    Clique numa foto para ver e salvar as fotos das suas próprias plantinhas!
                </Typography>
            </Grid>

            <Grid container direction="row" ml="5%" mt="2%" columnGap="5%">
                {listaPlantas?.map((planta, index) =>
                    <Card raised key={index}>
                        <CardContent>
                            <Grid container direction="column" alignContent="center">
                                <Grid item onClick={() => handlePaginaDaPlanta(planta)} sx={{ cursor: "pointer" }}>
                                    <img src={planta.imagemReferencia ?? plantaPlaceholder}
                                        alt="Imagem da planta exibida"
                                        width="300vw" height="300vh" />
                                </Grid>

                                <Grid container direction="row" justifyContent="space-between" mt="0.5%">
                                    <Grid item textAlign="center">
                                        <Typography
                                            fontSize="1.5rem"
                                        >
                                            {planta.nome}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Grid container direction="row" justifyContent="end">
                                            <Grid item>
                                                <Tooltip title="Editar">
                                                    <IconButton onClick={() => handleEditarPlanta(planta)}>
                                                        <EditIcon sx={{ fontSize: "26px" }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>

                                            <Grid item>
                                                <Tooltip title="Excluir">
                                                    <IconButton
                                                        onClick={() => { handleAbrir(planta) }}
                                                    >
                                                        <DeleteIcon sx={{ fontSize: "26px" }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Grid>

                                            <ModalConfirmacao
                                                isAberto={isAberto}
                                                handleFechar={handleFechar}
                                                nomeAcao={`excluir ${plantaSelecionada.nome}`}
                                                funcaoModal={handleExcluirPlanta}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )}

            </Grid>
        </Grid>
    )
}
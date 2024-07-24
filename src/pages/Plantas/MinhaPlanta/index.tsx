import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePlantaContext } from "../../../hooks/usePlantaContext";
import { push, ref } from "firebase/database";
import { database } from "../../../config/firebase-config";
import { PlantaCloudStorage } from "../../../service/cloudStorage/PlantaCloudStorage";
import { FirestoreService } from "../../../service/firestore/FirestoreService";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { CircularProgressWithLabel } from "../../../components/CircularProgressWithLabel";
import { RootState } from '../../../redux/configureStore';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    userId: state.user.userData.userId,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CombinedProps = PropsFromRedux & { userId: string };

const VerMinhaPlanta = ({ userId }: CombinedProps) => {
    const { planta } = usePlantaContext();
    const { uploadFotoMinhaPlanta, progressoUpload, isPaused, excluirImagem } = PlantaCloudStorage();
    const navigate = useNavigate()
    const [imagem, setImagem] = useState<File>();
    const [envioEmProgresso, setEnvioEmProgresso] = useState<boolean>(false)
    const { buscarFotosMinhaPlanta, listaFotos } = FirestoreService()

    // TODO: fazer a barra de carregamento desaparecer após 100% concluída
    // useEffect(() => {
    //     if (progressoUpload === 100) {
    //         setEnvioEmProgresso(false)
    //     }
    // }, [progressoUpload])

    useEffect(() => {
        if (userId && (userId !== undefined) && (userId !== "")) {
            buscarFotosMinhaPlanta(planta, userId);
        }
    }, [userId]);

    const handleVoltar = () => {
        navigate("/plantas");
    };

    const handleAddFoto = (event: any) => {
        const foto = event.target.files[0];
        setImagem(foto);
    };

    const handleEnviaFoto = () => {
        if (imagem != null) {
            setEnvioEmProgresso(true);
            const criarChave = push(ref(database)).key + '-' + imagem.name;
            uploadFotoMinhaPlanta(planta, criarChave, imagem, userId);
        }
    };

    const handleExcluirImagem = (urlDaImagem: string) => {
        // Modal confirmando a exclusão
        excluirImagem(planta, urlDaImagem, userId);
    };

    const handlePlayPause = () => {
        if (isPaused) {
            alert("Desculpe! A pausa de uploads ainda não foi implementada...");
        };
    };

    // TODO: possibilitar legenda nas fotos
    // TODO: possibilitar cadastro de plantas individuais
    // TODO: nas páginas individuais de cada planta, incluir frequência de rega, adubação, etc

    return (
        <Card raised sx={{ width: "85%", ml: "7%", mt: "5%", mb: "5%" }}>
            <CardContent>
                <Grid container direction="row">
                    <Grid item xs={3}>
                        <Button
                            color="success"
                            variant="contained"
                            sx={{ ml: "5%", mt: "2%" }}
                            onClick={handleVoltar}
                        > Voltar </Button>
                    </Grid>
                    <Grid item>
                        <Typography fontSize="2.5rem" textAlign="center" mt="2%" mb="2%">
                            Minha planta: {planta.nome}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="row" justifyContent="end" columnGap="1%">
                    <Grid item hidden={envioEmProgresso ? false : true} mr="1%">
                        <CircularProgressWithLabel
                            variant="determinate"
                            color="success"
                            value={progressoUpload}
                        />
                    </Grid>

                    <Grid item>
                        <Button
                            variant="contained"
                            color="success"
                            component="label"
                        >
                            Adicionar uma foto
                            <input type="file" accept="image/*" hidden onChange={handleAddFoto} />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Enviar">
                            <IconButton onClick={handleEnviaFoto}>
                                <SendRoundedIcon sx={{ fontSize: "26px" }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>

                <Grid container direction="column" mt="4%" >
                    <Grid container direction="row" justifyContent="space-evenly" columnGap="5%">
                        {listaFotos?.map((foto, index) =>
                            <Grid item key={index} mb="5%">
                                <Card raised sx={{ backgroundColor: "white" }}>
                                    <CardContent>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <img src={foto} width="250vw" height="250vh" />
                                            </Grid>

                                            {/* <Grid container direction="row" justifyContent="end">
                                                <Grid item>
                                                    <Tooltip title="Excluir">
                                                        <IconButton onClick={() => handleExcluirImagem(foto)}>
                                                            <DeleteRoundedIcon sx={{ fontSize: "26px" }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                            </Grid> */}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    )
};

export const MinhaPlanta = connector(VerMinhaPlanta);
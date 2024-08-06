import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material'
import happySucculent from '../../styles/icons/happy-succulent.png'
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../../service/auth/AuthProvider";
import './index.css'
import { firebaseAuth } from '../../config/firebase-config';
import { useEffect, useState } from 'react';
import { FirestoreService } from '../../service/firestore/FirestoreService';
import plantaPlaceholder from '../../styles/img-placeholders/planta-placeholder1.avif'
import { Planta } from '../../interfaces/PlantaInterface';
import { usePlantaContext } from '../../hooks/usePlantaContext';
import { ModalAviso } from '../../components/ModalAviso';
import { RootState } from '../../redux/configureStore';
import { connect, ConnectedProps } from 'react-redux';
import { Loading } from '../../components/Loading';

const mapStateToProps = (state: RootState) => ({
    userId: state.user.userData.userId,
    displayName: state.user.userData.displayName,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CombinedProps = PropsFromRedux & { userId: string } & { displayName: string | null };

const Home = ({ displayName, userId }: CombinedProps) => {
    const { sair } = AuthProvider();
    const { verPlantas, listaPlantas } = FirestoreService();
    const { setPlanta } = usePlantaContext();
    const [isModalAberto, setIsModalAberto] = useState<boolean>(false);
    const [mensagemModal, setMensagemModal] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if ((userId !== "") && (userId !== undefined)) {
            carregarPlantas();
        } else {
            setIsLoading(true);
        }
    }, [userId])

    const carregarPlantas = () => {
        firebaseAuth.authStateReady()
            .then(async () => {
                setIsLoading(true);
                await verPlantas(userId);
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    };

    const handleSair = async () => {
        await sair().catch(() => {
            setMensagemModal("Houve um problema ao sair da sua conta.");
            setIsModalAberto(true);
        })
    };

    const handlePaginaDaPlanta = (planta: Planta) => {
        setPlanta(planta);
        navigate("/plantas/minha-planta");
    };

    return (
        <div>
            {isLoading ?
                <Loading isLoading={isLoading} />
                : <Grid container direction="row">
                    <Grid item width="35%" mr="3%">
                        <Grid container direction="column" alignItems="center" whiteSpace="normal" pt="10%">
                            <Grid item display="flex" justifyContent="center">
                                <Avatar src={happySucculent} variant="rounded"
                                    sx={{ width: "20%", height: "30%", mt: "8%" }} />
                            </Grid>

                            <Grid item pt="5%" pb="5%">
                                <Typography sx={{ fontSize: "2rem", width: "maxContent", textAlign: "center" }}>
                                    Bem vindo(a) de volta, <br />
                                    {displayName ?? "jardineiro(a)"}!
                                </Typography>
                            </Grid>

                            <Grid item sx={{ width: "60%", textAlign: "center", pb: "1%", pt: "3%" }}>
                                <Link className="links-home" to="/perfil"> Ver perfil </Link>
                            </Grid>

                            <Grid item sx={{ width: "60%", textAlign: "center", pb: "1%" }}>
                                <Link className="links-home" to="/plantas"> Ver suas plantas </Link>
                            </Grid>

                            <Grid item sx={{ width: "60%", textAlign: "center", pb: "1%" }}>
                                <Link className="links-home" to="/plantas/cadastrar"> Adicionar uma planta </Link>
                            </Grid>

                            <Grid item sx={{ width: "60%", textAlign: "center" }}>
                                <Typography
                                    onClick={handleSair}
                                    sx={{
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                        fontSize: "1.5rem",
                                        color: "#874d18",
                                    }}
                                >
                                    Sair
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item width="60%">
                        <Typography fontSize="2rem" textAlign="center" mt="3%"> Suas plantas favoritas: </Typography>

                        <Grid container direction="row" pt="5%" justifyContent="space-between">
                            {listaPlantas?.map((planta, index) =>
                                <Card raised key={index} sx={{ mb: "3%" }}>
                                    <CardContent style={{ paddingBottom: "15px" }}>
                                        <Grid item onClick={() => handlePaginaDaPlanta(planta)} sx={{ cursor: "pointer" }}>
                                            <img src={planta.imagemReferencia ?? plantaPlaceholder}
                                                alt={`Imagem de ${planta.nome}`}
                                                width="200vw" height="200vh" />
                                        </Grid>

                                        <Grid container direction="row" justifyContent="space-between" mt="0.5%">
                                            <Grid item>
                                                <Typography
                                                    fontSize="1.33rem"
                                                >
                                                    {planta.nome}
                                                </Typography>
                                            </Grid>

                                            {/* TODO: Inserir a possibilidade de favoritar e desfavoritar */}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            )}
                        </Grid>
                    </Grid>

                    <ModalAviso
                        isAberto={isModalAberto}
                        handleFechar={() => setIsModalAberto(false)}
                        textoPrincipal={mensagemModal}
                        textoBotao="Fechar"
                        acaoBotao={() => setIsModalAberto(false)}
                    />
                </Grid>}
        </div>
    )
};

export const HomePage = connector(Home);
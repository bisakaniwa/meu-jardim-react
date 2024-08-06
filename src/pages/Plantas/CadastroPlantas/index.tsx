import { Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { FirestoreService } from "../../../service/firestore/FirestoreService";
import { Planta } from "../../../interfaces/PlantaInterface";
import { PlantaForm } from "../../../components/PlantaForm";
import { RootState } from '../../../redux/configureStore';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
    userId: state.user.userData.userId,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type CombinedProps = PropsFromRedux & { userId: string };

const CadastroPlantas = ({ userId }: CombinedProps) => {
    const navigate = useNavigate();
    const { cadastrarPlanta } = FirestoreService();

    const handleCadastrar: SubmitHandler<Planta> = (data: Planta) => {
        cadastrarPlanta(data, userId);
    }

    const voltarHome = () => {
        navigate("/")
    }

    return (
        <Card raised sx={{ width: "80%", mt: "5%", ml: "10%" }}>
            <Grid container justifyContent="center" mt="2%" mb="1%">
                <Grid item>
                    <Typography
                        fontWeight="500"
                        fontSize="2rem"
                    >
                        Cadastre uma planta:
                    </Typography>
                </Grid>
            </Grid>
            <CardContent>
                <PlantaForm
                    funcaoSubmit={handleCadastrar}
                    funcaoVoltar={voltarHome}
                    nomeBotao="Cadastrar"
                />
            </CardContent>
        </Card>
    )
};

export const CadastrarPlantas = connector(CadastroPlantas);
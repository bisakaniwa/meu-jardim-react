import { SubmitHandler, useForm } from "react-hook-form";
import { Planta } from "../../interfaces/PlantaInterface";
import { Button, Grid, TextField } from "@mui/material";

type PlantaFormType = {
    funcaoSubmit: SubmitHandler<Planta>;
    funcaoVoltar: () => void;
    nomeBotao: string;
    planta?: Planta;
}

export const PlantaForm = ({ funcaoSubmit, funcaoVoltar, nomeBotao, planta }: PlantaFormType) => {
    const { register, handleSubmit } = useForm<Planta>({ defaultValues: planta ?? undefined });

    // TODO: colocar possibilidade de preview da imagem de referência
    
    return (
        <form onSubmit={handleSubmit(funcaoSubmit)}>
            <Grid container direction="column" alignContent="center" rowSpacing="3%">
                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Nome da planta*"
                        {...register("nome", { required: true })}
                        sx={{ width: "30vw"}}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Nome científico"
                        {...register("nomeCientifico")}
                        sx={{ width: "30vw"}}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Tipo de planta"
                        {...register("tipoDePlanta")}
                        sx={{ width: "30vw"}}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Imagem de referência"
                        {...register("imagemReferencia")}
                        sx={{ width: "30vw"}}
                    />
                </Grid>

                <Grid item>
                    <TextField
                        variant="outlined"
                        label="Descrição"
                        {...register("descricao")}
                        sx={{ width: "30vw"}}
                    />
                </Grid>
            </Grid>

            <Grid container
                direction="row"
                justifyContent="center"
                mt="3%" mb="0.5%"
                columnGap="3%"
            >
                <Button
                    type="submit"
                    variant="contained"
                    className='botaoCadastrarPlanta'
                    color="success"
                >
                    {nomeBotao}
                </Button>

                <Button
                    onClick={funcaoVoltar}
                    className='botaoCancelarCadastroPlanta'
                    variant='contained'
                    color='error'
                >
                    Cancelar
                </Button>
            </Grid>
        </form>
    )
}
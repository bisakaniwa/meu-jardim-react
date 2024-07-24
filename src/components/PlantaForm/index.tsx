import { SubmitHandler, useForm } from "react-hook-form";
import { Planta } from "../../interfaces/PlantaInterface";
import { Avatar, Button, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useState } from "react";
import { Clear } from "@mui/icons-material";

type PlantaFormType = {
    funcaoSubmit: SubmitHandler<Planta>;
    funcaoVoltar: () => void;
    nomeBotao: string;
    planta?: Planta;
}

export const PlantaForm = ({ funcaoSubmit, funcaoVoltar, nomeBotao, planta }: PlantaFormType) => {
    const { register, handleSubmit } = useForm<Planta>({ defaultValues: planta ?? undefined });
    const [image, setImage] = useState<string>(planta?.imagemReferencia ?? '')

    return (
        <form onSubmit={handleSubmit(funcaoSubmit)}>
            <Grid container direction="row" justifyContent={image ? "space-evenly" : "center"}>
                <Grid item>
                    <Grid container direction="column" alignContent={image ? "start" : "center"}
                        rowSpacing="3%"
                    >
                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Nome da planta*"
                                {...register("nome", { required: true })}
                                sx={{ width: "30vw" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Nome científico"
                                {...register("nomeCientifico")}
                                sx={{ width: "30vw" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Tipo de planta"
                                {...register("tipoDePlanta")}
                                sx={{ width: "30vw" }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Imagem de referência"
                                {...register("imagemReferencia", { onChange: (event) => setImage(event.target.value) })}
                                sx={{ width: "30vw" }}
                                value={image}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Tooltip title="Remover imagem">
                                                <IconButton
                                                    disabled={image === ''}
                                                    type="reset"
                                                    onClick={() => setImage('')}
                                                >
                                                    <Clear sx={{ color: "grey", fontSize: "17px" }} />
                                                </IconButton>
                                            </Tooltip>
                                        </InputAdornment>
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Descrição"
                                multiline
                                {...register("descricao")}
                                sx={{ width: "30vw" }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                {image !== '' ?
                    <Grid item mt="1.5%">
                        <Grid container direction="column" alignContent="end">
                            <Grid item>
                                <Avatar variant="rounded" src={image} sx={{ height: "300px", width: "300px" }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    : null}
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
        </form >
    )
}
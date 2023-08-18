import { Grid, IconButton, TextField, Tooltip } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from "react";

type FiltroEPesquisaType = {
    setPlantaPesquisada: React.Dispatch<React.SetStateAction<string>>
    funcaoPesquisa: () => void
}

export const BarraFiltroEPesquisa = ({ setPlantaPesquisada, funcaoPesquisa }: FiltroEPesquisaType) => {

    const onChangePesquisa = (event: ChangeEvent<HTMLInputElement>) => {
        setPlantaPesquisada(event.target.value)
    }

    return (
        <Grid container direction="row" justifyContent="end" columnGap="1%" pr="5%">
            <Grid item>
                <TextField
                    variant="filled"
                    label="Pesquisar uma planta"
                    sx={{ width: "20vw" }}
                    autoComplete='off'
                    onChange={onChangePesquisa}
                    disabled
                />
            </Grid>
            <Grid item mt="0.6%">
                <Tooltip title="Pesquisar">
                    <IconButton onClick={() => {}}>
                        <SearchIcon sx={{ fontSize: "26px", color: "black" }} />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}
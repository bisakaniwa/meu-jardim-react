import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material"

type ModalConfirmacaoType = {
    isAberto: boolean,
    handleFechar: () => void,
    nomeAcao: string,
    funcaoModal: () => void,
}

export const ModalConfirmacao = ({ isAberto, handleFechar, nomeAcao, funcaoModal }: ModalConfirmacaoType) => {
    return (
        <Dialog
            open={isAberto}
            onClose={handleFechar}
        >
            <DialogContent>
                <Grid container direction="column" alignContent="center">
                    <Grid item>
                        <Typography
                        fontSize="1.5rem"
                        > Tem certeza que deseja {nomeAcao}?</Typography>
                    </Grid>

                    <Grid container direction="row" justifyContent="end" columnGap="5%" mt="5%">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={funcaoModal}
                            > Sim </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleFechar}
                            > Cancelar </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}
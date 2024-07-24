import React from 'react';
import { Button, Dialog, Grid, Typography } from '@mui/material';

type ModalAvisoProps = {
   isAberto: boolean,
   handleFechar: () => void,
   textoPrincipal: string,
   textoSecundario?: string,
   textoBotao: string,
   acaoBotao: any,
}

export const ModalAviso = ({
   isAberto, handleFechar, textoPrincipal, textoSecundario, textoBotao, acaoBotao
}: ModalAvisoProps) => {

   const aoClicarBotao = () => {
      handleFechar();
      acaoBotao();
   };

   return (
      <Dialog
         open={isAberto}
         onClose={handleFechar}
         fullWidth
         maxWidth="xs"
      >
         <Grid container direction="column">
            <Grid item>
               <Typography>
                  {textoPrincipal}
               </Typography>
            </Grid>
            <Grid item hidden={!textoSecundario}>
               <Typography>
                  {textoSecundario}
               </Typography>
            </Grid>
            <Grid item>
               <Button variant="contained" onClick={aoClicarBotao}>
                  {textoBotao}
               </Button>
            </Grid>
         </Grid>
      </Dialog>
   )
}

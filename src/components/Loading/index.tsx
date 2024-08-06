import React from 'react';
import { Box, CircularProgress } from '@mui/material';

type LoadingProps = {
   isLoading?: boolean,
};

export const Loading = ({ isLoading }: LoadingProps) => {
   return (
      <Box hidden={!isLoading} display="flex" justifyContent="center" pt="27%">
         <CircularProgress thickness={5} size={110} sx={{ color: "#9d3900" }} />
      </Box>
   )
};

import * as React from 'react';
import { useState } from 'react'
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material"
import Box from '@mui/material/Box';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';

export const CircularProgressWithLabel = (
    props: CircularProgressProps & 
    // { isPaused: boolean, handlePlayPause: () => void, setIsPaused: React.Dispatch<React.SetStateAction<boolean>> },
    { value: number }
) => {
    const [isPaused, setIsPaused] = useState<boolean>(false)

    const handlePlayPause = () => {
        setIsPaused(!isPaused)
    }

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* <IconButton onClick={handlePlayPause}>
                    {isPaused
                        ? <PlayArrowRoundedIcon />
                        : <PauseRoundedIcon />
                    }
                </IconButton> */}
                <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
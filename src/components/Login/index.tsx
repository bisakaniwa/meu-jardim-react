import { Card, CardContent, Typography } from '@mui/material'
import { LoginForm } from './LoginForm'
import './index.css'

export const Login = () => {
    return (
        <Card raised sx={{ width: "65%", mt: "15%", ml: "3%"}}>
            <Typography textAlign={"center"} className='tituloLogin'> Login </Typography>
            <CardContent sx={{ mb: "3%"}}>
                <LoginForm />
            </CardContent>
        </Card>
    )
}
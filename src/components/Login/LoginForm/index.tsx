import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Grid, TextField } from '@mui/material'
import './index.css'
import { Link, useNavigate } from "react-router-dom";
import { User, UserLogin } from "../../../interfaces/UserInterface";
import { UserContext } from '../../../context/UserContext/context';
import { useContext, useEffect, useState } from 'react';
import { loginService } from '../../../service/back-Java/loginPost';

export const LoginForm = () => {
    const { register, handleSubmit } = useForm<UserLogin>();
    const { tryLogin } = loginService();
    const { setUser } = useContext(UserContext);
    const [userLocal, setUserLocal] = useState<User>();
    const navigate = useNavigate();

    useEffect(() => {
        if (userLocal !== undefined && userLocal !== null) {
          setUser(userLocal);
          navigate("/home");
        }
      }, [userLocal, setUser, navigate]);

    const login: SubmitHandler<UserLogin> = data => {
        tryLogin(data).then((dadosUsuario: User) => { setUserLocal(dadosUsuario); });
    }

    return (
        <form onSubmit={handleSubmit(login)} className="loginForm">
            <Grid container display="flex" flexDirection="column" ml={8}>
                <Grid item xs={8}>
                    <TextField
                        variant="outlined"
                        label="E-mail ou username"
                        {...register("identificacao", { required: true })}
                        sx={{ mb: 2 }}
                    />
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        type="password"
                        variant="outlined"
                        label="Senha"
                        {...register("senha", { required: true })}
                        sx={{ mb: 2 }}
                    />
                </Grid>

                <Grid item sx={{ textAlign: "start", mb: 1, ml: 1.2 }}>
                    <Link to="" className="links"> Esqueci minha senha. </Link>
                </Grid>

                <Grid item sx={{ textAlign: "start", mb: 2, ml: 1.2 }}>
                    <Link to="/cadastro" className="links"> Ainda não tem um cadastro? </Link>
                </Grid>

                <Grid item xs={8}>
                    <Button className="botaoLogin" type="submit" variant="contained"> Login </Button>
                </Grid>
            </Grid>
        </form>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Inicio } from "./pages/Inicio"
import { Cadastro } from "./pages/Cadastro"
import { Home } from "./pages/Home"
import { Perfil } from "./pages/Perfil"
import { Editar } from "./pages/Perfil/Editar"

export const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/cadastro" element={<Cadastro />} />

                <Route path="/home" element={<Home />} />
                <Route path="/perfil" element={<Perfil />}>
                    <Route path="/perfil/editar" element={<Editar />} />
                </Route>

                <Route path="/plantas">
                    <Route path="/plantas/todas" />
                    <Route path="/plantas/adicionar" />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
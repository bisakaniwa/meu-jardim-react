import { createBrowserRouter } from "react-router-dom"
import { Inicio } from "./pages/Inicio"
import { Cadastro } from "./pages/Cadastro"
import { Home } from "./pages/Home"
import { Perfil } from "./pages/Perfil"
import { Editar } from "./pages/Perfil/Editar"
import { NotFound } from "./pages/NotFound"

export const router = createBrowserRouter([

    { path: "/", Component: Inicio },
    { path: "/cadastro", Component: Cadastro },
    { path: "/home", Component: Home },
    {
        path: "/perfil", children: [
            { index: true, Component: () => <Perfil /> },
            { path: "/perfil/editar", Component: () => <Editar /> },
            { path: "*", Component: NotFound }
        ]
    },
    {
        path: "/plantas", children: [
            { index: true, Component: () => <></> },
            { path: "/plantas/adicionar", Component: () => <></> },
            { path: "*", Component: NotFound },
        ]
    },
    { path: "*", Component: NotFound },

]);
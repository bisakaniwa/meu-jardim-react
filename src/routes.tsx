import { createBrowserRouter } from "react-router-dom"
import { Inicio } from "./pages/Inicio"
import { Cadastro } from "./pages/Cadastro"
import { Home } from "./pages/Home"
import { Perfil } from "./pages/Perfil"
import { Editar } from "./pages/Perfil/Editar"
import { NotFound } from "./pages/NotFound"
import { CadastroPlanta } from "./pages/Admin/CadastroPlanta"
import { ListaPlantas } from "./pages/Admin/ListaPlantas"
import { CadastroFirebase } from "./components/CadastroFirebase"
import { CadastroPlantas } from "./pages/Plantas/CadastroPlantas"
import { VerPlantas } from "./pages/Plantas/VerPlantas"
import { EditarPlantas } from "./pages/Plantas/EditarPlantas"
import { MinhaPlanta } from "./pages/Plantas/MinhaPlanta"

export const router = createBrowserRouter([

    { path: "/", Component: Inicio },
    { path: '/cadastro-firebase', Component: CadastroFirebase },
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
            { index: true, Component: () => <VerPlantas /> },
            { path: "/plantas/cadastrar", Component: () => <CadastroPlantas /> },
            { path: "/plantas/editar", Component: () => <EditarPlantas /> },
            { path: "/plantas/minha-planta", Component: () => <MinhaPlanta /> },
            { path: "*", Component: NotFound },
        ]
    },
    {
        path: "/plantasReferencia", children: [
            { index: true, Component: () => <ListaPlantas /> },
            { path: "/plantasReferencia/cadastrar", Component: () => <CadastroPlanta /> },
            { path: "*", Component: NotFound },
        ]
    },
    { path: "*", Component: NotFound },

]);
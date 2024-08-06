import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./service/auth/protectedRoute";
import { Inicio } from "./pages/Inicio";
import { HomePage } from "./pages/Home";
import { Perfil } from "./pages/Perfil";
import { Editar } from "./pages/Perfil/Editar";
import { NotFound } from "./pages/NotFound";
import { CadastroPlanta } from "./pages/Admin/CadastroPlanta";
import { ListaPlantas } from "./pages/Admin/ListaPlantas";
import { CadastroFirebase } from "./pages/Cadastro/CadastroFirebase";
import { CadastrarPlantas } from "./pages/Plantas/CadastroPlantas";
import { VerPlantas } from "./pages/Plantas/VerPlantas";
import { EditarPlantas } from "./pages/Plantas/EditarPlantas";
import { MinhaPlanta } from "./pages/Plantas/MinhaPlanta";
import { Loading } from "./components/Loading";

export const AppRouter = () => {
    const router = createBrowserRouter([
        { path: "/login", index: true, element: <Inicio /> },
        { path: '/cadastro', element: <CadastroFirebase /> },
        // { path: "/cadastro", Component: Cadastro },
        {
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/", element: <HomePage />
                },
                {
                    path: "/perfil", children: [
                        {
                            index: true, element: <Perfil />
                        },
                        {
                            path: "/perfil/editar", element: <Editar />
                        },
                        {
                            path: "/perfil/*", element: <NotFound />
                        }
                    ]
                },
                {
                    path: "/plantas", children: [
                        {
                            index: true, element: <VerPlantas />
                        },
                        {
                            path: "/plantas/cadastrar", element: <CadastrarPlantas />
                        },
                        {
                            path: "/plantas/editar", element: <EditarPlantas />
                        },
                        {
                            path: "/plantas/minha-planta", element: <MinhaPlanta />
                        },
                        {
                            path: "/plantas/*", element: <NotFound />
                        },
                    ]
                },
                {
                    path: "/plantasReferencia", children: [
                        {
                            index: true, element: <ListaPlantas />
                        },
                        {
                            path: "/plantasReferencia/cadastrar", element: <CadastroPlanta />
                        },
                        {
                            path: "/plantasReferencia/*", element: <NotFound />
                        },
                    ]
                },
            ]
        },
        { path: "*", element: <NotFound /> },
    ], { basename: "/" });

    return (
        <RouterProvider router={router} fallbackElement={<Loading />} />
    )
}
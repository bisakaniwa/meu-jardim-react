import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserSelector } from "../../redux/configureStore";
import { Loading } from "../../components/Loading";

export const ProtectedRoute = () => {
    const userToken = useUserSelector(state => state.user.userToken.currentToken);

    if (!userToken || (userToken === ("" ?? undefined))) {
        alert("Você não está logado!");
        return <Navigate to="/login" replace />
    } else {
        return (
            <Suspense fallback={<Loading />}>
                <Outlet />
            </Suspense>
        )
    }
}
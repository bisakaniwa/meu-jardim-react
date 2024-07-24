import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
    isAuthenticated: Promise<boolean>,
};

export const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
    if (!isAuthenticated) {
        alert("Você não está logado!");
        return <Navigate to="/" replace />
    } else {
        return (
            <Suspense fallback={<CircularProgress sx={{ color: "#9d3900" }} />}>
                <Outlet />
            </Suspense>
        )
    }
}
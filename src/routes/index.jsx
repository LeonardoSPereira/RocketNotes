import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";
import { api } from "../services/api";

export function Routes() {
    const { user, signOut } = useAuth();

    useEffect(() => {
        api
         .get("/users/validated")
         // eslint-disable-next-line no-unused-vars
         .catch((error) => signOut() );

    });

    return (
        <BrowserRouter>
            { user ? <AppRoutes /> : <AuthRoutes /> }
        </BrowserRouter>
    );
}
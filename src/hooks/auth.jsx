import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    
    const [data, setData] = useState({});

    async function signIn({ email, password }) {


        try {
            const response = await api.post("/sessions", { email, password }, { withCredentials: true });
            const { user } = response.data;

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

            setData({ user });

        } catch(error) {

            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível fazer o login");
            }

        }
    }

    function signOut() {
        localStorage.removeItem("@rocketnotes:user");

        setData({});
    }

    async function updateProfile({ user, avatarFile }) {
        try {

            if(avatarFile) {
                const fileUploadForm = new FormData();
                fileUploadForm.append("avatar", avatarFile);

                const response = await api.patch("/users/avatar", fileUploadForm);
                user.avatar = response.data.avatar;
            }
            
            await api.put("/users", user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

            setData({ user, token: data.token });
            alert("Dados do usuário atualizados com sucesso!");


        } catch (error) {

            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível atualizar os dados do usuário");
            }
        }
    }

    useEffect(() => {
        const user = localStorage.getItem("@rocketnotes:user");

        if(user) {

            setData({
                user: JSON.parse(user)
            });
        }
        
    }, []);

    return (
        <AuthContext.Provider value={{ 
            signIn, 
            signOut,
            updateProfile,
            user: data.user,

        }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}


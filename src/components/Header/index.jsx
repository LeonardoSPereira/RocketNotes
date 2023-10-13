import { RiShutDownLine } from "react-icons/ri"
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/avatarPlaceholder.svg";
import { api } from "../../services/api";



export function Header() {

    const { signOut, user } = useAuth();
    const navigate = useNavigate();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;


    function handleSignOut() {
        signOut();
        navigate("/")
    }


    return (
        <Container>
            <Profile to="/profile">
                <img src={avatarURL} alt={user.name}/>

                <div>
                    <span>Bem vindo,</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>

            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}
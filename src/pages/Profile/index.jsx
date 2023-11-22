import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from "react-icons/fi";
import { Container, Form, Avatar } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";
import avatarPlaceholder from "../../assets/avatarPlaceholder.svg";
import { api } from "../../services/api";


export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarURL);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate() {
        const updated = {
            name,
            email,
            old_password: currentPassword,
            password: newPassword,
        };

        const userUpdated = Object.assign(user, updated);

        updateProfile({ user: userUpdated, avatarFile });

    }

    function handleAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }


    return (
        <Container>
            <header>
                <Link to={-1}>
                    <FiArrowLeft />
                </Link>
            </header>

            <Form>
                <Avatar>
                    <img 
                        src={avatar} 
                        alt="Foto do usuário" 
                    />

                    <label htmlFor="avatar">
                        <FiCamera />
                        <input
                            id="avatar" 
                            type="file"
                            onChange={handleAvatar}
                        />
                    </label>

                </Avatar>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setCurrentPassword(e.target.value)}
                />

                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setNewPassword(e.target.value)}

                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>

        </Container>
    );
}
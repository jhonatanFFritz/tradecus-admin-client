import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {

    const { id } = useParams();

    const navigate = useNavigate(); // Hook useNavigate

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/users/${id}`);
                const data = res.data.data;
                setUsername(data.username);
                setEmail(data.email);
                setPassword(data.password);
                setRole(data.role);
            } catch (error) {
                toast.error('Error al obtener los datos del usuario');
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!username || !email || !password || !role) {
            setErrorMessage("Todos los campos son obligatorios");
            return;
        }

        const user = {
            username: username,
            email: email,
            password: password,
            role: role,
        };

        try {
            await axios.put(`${BASE_URL}/users/${id}`, user);
            toast.success('Usuario actualizado exitosamente!');
            navigate("/manage_users");  // After successful update, navigate back to the user list
        } catch (error) {
            toast.error('Ocurrió un error al actualizar el usuario');
        }
    };

    return (
        <div className="EditUser">
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <select 
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
            >
                <option value="">--Por favor elige una opción--</option>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select>
            {errorMessage && <p>{errorMessage}</p>}
            <input type="submit" value="Actualizar usuario" />
        </form>
        <button onClick={() => navigate("/manage_users")}>Regresar</button>
        </div>
    );
};

export default EditUser;

import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { TextField, Button } from "@mui/material";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("user");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Hook useNavigate

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validación de campos obligatorios
    if (!username || !email || !password || !photo || !role) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    const user = {
      username: username,
      email: email,
      password: password,
      photo: photo,
      role: role,
    };

    axios
      .post(`${BASE_URL}/users`, user)
      .then((response) => {
        console.log(response.data);
        toast.success('Usuario creado exitosamente!');
        setUsername("");
        setEmail("");
        setPassword("");
        setPhoto("");
        setRole("user");
        setErrorMessage("");
      })
      .catch((error) => {
        toast.error('Ocurrió un error al crear el usuario');
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre de Usuario"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Foto"
          type="text"
          name="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <TextField
          select
          label="Rol"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value="user">Usuario</option>
          <option value="admin">Admin</option>
        </TextField>
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant="contained" type="submit">
          Crear usuario
        </Button>
        <Button variant="contained" onClick={() => navigate("/manage_users")}>
          Regresar
        </Button>
      </form>
    </div>
  );
};

export default CreateUser;

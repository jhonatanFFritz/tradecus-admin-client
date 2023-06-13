import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const DniField = ({ index, dni, setDni, userData, setUserData, disabled }) => {
  const fetchDniData = async (e) => {
    e.stopPropagation();
    console.log("Fetching DNI data...");
    if (dni[index] && dni[index].length === 8) {
      try {
        // Cambia esta URL a tu propio endpoint
        const response = await axios.get(
          `http://localhost:5000/api/v1/dni/getDniData/${dni[index]}`
        );
        console.log("Response:", response);

        if (
          response.data &&
          response.data.nombres &&
          response.data.apellidoPaterno &&
          response.data.apellidoMaterno
        ) {
          let tempUserData = [...userData];
          tempUserData[index] = response.data;
          setUserData(tempUserData);
        } else {
          toast.error(
            "La respuesta del servidor no contiene los datos esperados."
          );
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Error al obtener los datos del DNI.");
      }
    } else {
      toast.error("Por favor, introduce un DNI válido.");
    }
  };

  return (
    <div className="flex items-center gap-2 my-3">
      <TextField
        label="DNI"
        value={dni[index] || ""}
        disabled={disabled}
        onChange={(e) => {
          const inputValue = e.target.value;
          const numbersOnly = /^[0-9\b]+$/;

          if (inputValue.match(numbersOnly) || inputValue === "") {
            let tempDni = [...dni];
            tempDni[index] = inputValue;
            setDni(tempDni);
          }
        }}
        inputProps={{
          inputMode: "numeric", // Cambiar a "numeric" para permitir solo números
          pattern: "[0-9]*", // Asegurarse de que solo se permitan caracteres numéricos
        }}
      />

      <div
        className="h-14 flex items-center justify-center bg-green-500 hover:bg-green-700 rounded text-slate-100 font-bold py-2 px-4 cursor-pointer"
        onClick={fetchDniData}
        disabled={
          !dni[index] ||
          dni[index].length !== 8 ||
          !dni[index].match(/^[0-9\b]+$/)
        }
      >
        <span>Validar</span>
      </div>

      <p className="font-bold text-slate-700">Nombres y Apellidos:</p> 
      {userData[index] && userData[index].nombres && (
        <p className="text-slate-700">{userData[index].nombres}</p> 
      )}
      {userData[index] &&
        userData[index].apellidoPaterno &&
        userData[index].apellidoMaterno && (
          <p className="text-slate-700">
            {userData[index].apellidoPaterno}{" "}
            {userData[index].apellidoMaterno}
          </p>
        )}
    </div>
  );
};

export default DniField;

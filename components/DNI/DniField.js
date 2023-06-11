import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const DniField = ({ index, dni, setDni, userData, setUserData }) => {
  const fetchDniData = async () => {
    console.log('Fetching DNI data...'); 
    if (dni[index] && dni[index].length === 8) {
      try {
        // Cambia esta URL a tu propio endpoint
        const response = await axios.get(
          `http://localhost:5000/api/v1/dni/getDniData/${dni[index]}`
        );
        console.log('Response:', response);

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
        console.log('Error:', error);
        toast.error("Error al obtener los datos del DNI.");
      }
    } else {
      toast.error("Por favor, introduce un DNI válido.");
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="DNI"
        value={dni[index] || ""} // Aquí utilizamos el índice para obtener el valor correspondiente del array
        onChange={(e) => {
          let tempDni = [...dni];
          tempDni[index] = e.target.value;
          setDni(tempDni);
        }}
      />
      <button className="bg-red-500 hover:bg-red-700 rounded text-slate-100 font-bold py-2 px-4 rounde" onClick={fetchDniData}>
        Validar
      </button>
      {userData[index] && userData[index].nombres && (
        <p>Nombres: {userData[index].nombres}</p>
      )}
      {userData[index] &&
        userData[index].apellidoPaterno &&
        userData[index].apellidoMaterno && (
          <p>
            Apellidos: {userData[index].apellidoPaterno}{" "}
            {userData[index].apellidoMaterno}
          </p>
        )}
    </div>
  );
};

export default DniField;

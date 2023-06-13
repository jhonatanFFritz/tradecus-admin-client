import React, { useState } from "react";
import { Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";

function NewTourForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [duration, setDistance] = useState("");
  const [desc, setDescription] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [images, setPhotos] = useState([]);
  const [featured, setIsFeatured] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos obligatorios
    if (
      !title ||
      !price ||
      !city ||
      !duration ||
      !desc ||
      !maxGroupSize ||
      !images
    ) {
      setErrorMessage("Todos los campos son obligatorios");
      return;
    }

    // Crear un objeto FormData para enviar los datos y las fotos
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("city", city);
    formData.append("duration", duration);
    formData.append("desc", desc);
    formData.append("maxGroupSize", maxGroupSize);
    formData.append("featured", featured); // No es necesario convertir a cadena de texto


    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    // Configurar la cabecera de la petición para el envío de datos de formulario y archivos adjuntos
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:5000/tour", formData, config)
      .then((response) => {
        console.log(response.data);

        setTitle("");
        setPrice(0);
        setCity("");
        setDistance("");
        setDescription("");
        setPhotos([]);
        setIsFeatured(false); // Reiniciar el estado featured
        setErrorMessage("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePhotoChange = (e) => {
    const selectedPhotos = Array.from(e.target.files);

    if (selectedPhotos.length > 5) {
      setErrorMessage("Solo se permiten hasta 5 fotos");
      return;
    }

    setPhotos(selectedPhotos);
    setErrorMessage("");
  };

  return (
    <div>
      <div className="w-full">
        <h2>Crear nuevo Tour</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-5 grid grid-cols-2 gap-5"
          encType="multipart/form-data"
        >
          <TextField
            label="Título"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Precio"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Ciudad"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <TextField
            label="Duracion"
            type="text"
            value={duration}
            onChange={(e) => setDistance(e.target.value)}
          />

          <TextField
            label="Numero de personas"
            type="text"
            value={maxGroupSize}
            onChange={(e) => setMaxGroupSize(e.target.value)}
          />

          <TextField
            label="Descripción"
            multiline
            rows={4}
            value={desc}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControlLabel
            label="Destacado"
            control={
              <Checkbox
                checked={featured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
            }
          />

          <input
            type="file"
            name="images"
            multiple
            onChange={handlePhotoChange}
          />

          {errorMessage && <p>{errorMessage}</p>}
          <button
            variant="contained"
            type="submit"
            className="w-80 bg-green-500 hover:bg-green-700 rounded text-slate-100 font-bold py-2 px-4"
          >
            Crear Tour
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTourForm;

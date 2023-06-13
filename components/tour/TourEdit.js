import React, { useState, useEffect } from "react";
import { Modal, Fade, TextField, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";

function TourEdit({ open, handleClose, selectedTourEdit, updateTour }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [desc, setDescription] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [featured, setIsFeatured] = useState(false);
  const [images, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedTourEdit) {
      setTitle(selectedTourEdit.title);
      setPrice(selectedTourEdit.price);
      setCity(selectedTourEdit.city);
      setDuration(selectedTourEdit.duration);
      setDescription(selectedTourEdit.desc);
      setMaxGroupSize(selectedTourEdit.maxGroupSize);
      setIsFeatured(selectedTourEdit.featured);
    }
  }, [selectedTourEdit]);

  let tourId;
  if (selectedTourEdit) {
    tourId = selectedTourEdit._id;
  }
  console.log(selectedTourEdit);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !city || !duration || !desc || !maxGroupSize) {
      setErrorMessage("Todos los campos son obligatorios");
      console.log(selectedTourEdit);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("city", city);
    formData.append("duration", duration);
    formData.append("desc", desc);
    formData.append("maxGroupSize", maxGroupSize);
    formData.append("featured", featured);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .patch(`http://localhost:5000/tour/${tourId}`, formData, config)
      .then((response) => {
        setTitle("");
        setPrice("");
        setCity("");
        setDuration("");
        setDescription("");
        setMaxGroupSize("");
        setIsFeatured(false);
        setPhotos([]);
        setErrorMessage("");

        updateTour(response.data);
        handleClose();
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
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      className="flex justify-center items-center"
    >
      <Fade
        in={open}
        className="w-3/5 p-5 bg-slate-100 rounded overflow-hidden"
      >
        <div className="w-full p-5">
          <span className="text-2xl font-bold text-slate-700">Editar Tour</span>
          <p className="text-slate-400">
            Haga click fuera del formulario para cerrarlo
          </p>
          <form
            onSubmit={handleSubmit}
            className="w-full mt-5 grid grid-cols-2 gap-10"
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
              type="number"
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
              label="Duración"
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
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
              label="¿Destacar tour?"
              control={
                <Checkbox
                  checked={featured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  color="primary"
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
              className="w-60 bg-blue-500 hover:bg-blue-700 rounded text-slate-100 font-bold py-2 px-4"
            >
              Actualizar
            </button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default TourEdit;

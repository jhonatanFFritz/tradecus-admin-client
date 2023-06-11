import React, { useState, useEffect } from "react";
import { Modal, Fade, Button, TextField, FormControlLabel, Checkbox } from "@mui/material";
import axios from "axios";

function TourEdit({ open, handleClose, selectedTourEdit, updateTour }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [desc, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    if (selectedTourEdit) {
      setTitle(selectedTourEdit.title);
      setPrice(selectedTourEdit.price);
      setCity(selectedTourEdit.city);
      setMaxGroupSize(selectedTourEdit.maxGroupSize);
      setDescription(selectedTourEdit.desc);
      setIsFeatured(selectedTourEdit.isFeatured);
    }
  }, [selectedTourEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realizar la solicitud de actualización al backend
    axios
      .patch(`http://localhost:5000/tour/${selectedTourEdit._id}`, {
        title,
        price,
        city,
        maxGroupSize,
        desc,
        isFeatured,
      })
      .then((response) => {
        // Actualizar el tour en la lista de tours
        updateTour(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <div>
          <span>Editar Tour</span>
          <form onSubmit={handleSubmit}>
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
              label="Número de personas"
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
              control={
                <Checkbox
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
              }
              label="Destacado"
            />

            <Button variant="contained" type="submit">
              Actualizar
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default TourEdit;

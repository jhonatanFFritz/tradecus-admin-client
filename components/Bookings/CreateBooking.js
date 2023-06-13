import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { toast } from "react-toastify";
import DniField from "../DNI/DniField";
import { BASE_URL } from "../../utils/config";
const CreateBooking = ({ tours, session }) => {
  const [formData, setFormData] = useState({
    userName: session ? session.user.name : "",
    userEmail: session ? session.user.email : "",
    fullName: "",
    phone: "",
    email: "",
    tourName: "",
    tourType: "grupal",
    bookAt: getTodayDate(),
    guestSize: 0,
    guests: [],
    totalAmount: "",
    status: false,
    reservationCode: "",
  });
  const [selectedTour, setSelectedTour] = useState(null);
  // Declaramos 'quantity' antes de su uso.
  const [quantity, setQuantity] = useState(1);
  const [dni, setDni] = useState(new Array(1).fill(""));
  const [userData, setUserData] = useState(new Array(1).fill({}));
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState("");

  useEffect(() => {
    // Si el número de invitados cambia, reiniciar los valores de DNI y userData
    setDni(new Array(formData.guestSize).fill(""));
    setUserData(new Array(formData.guestSize).fill({}));
    setQuantity(formData.guestSize);
  }, [formData.guestSize]);

  // ...
  const [selectedTourType, setSelectedTourType] = useState("grupal");
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "tourName") {
      const selectedTour = tours.find((tour) => tour.title === value);
      setSelectedTour(selectedTour);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        totalAmount:
          selectedTour && selectedTour.price && formData.guestSize
            ? selectedTour.price * parseInt(formData.guestSize)
            : "",
      }));
      return;
    }
  
    if (name === "guestSize") {
      const maxGroupSize = selectedTour ? selectedTour.maxGroupSize : 0;
      const parsedValue = parseInt(value);
      const validValue =
        parsedValue > 0 && parsedValue <= maxGroupSize ? parsedValue : 0;
  
      const selectedTourType = formData.tourType;
      const precioPriv =
        Number(selectedTour.price) *
        (selectedTourType === "privado" ? 4 : 1) *
        validValue;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: validValue,
        totalAmount:
          selectedTour &&
          selectedTour.price &&
          validValue &&
          selectedTourType === "privado"
            ? precioPriv
            : selectedTour
            ? selectedTour.price * validValue
            : "",
      }));
      return;
    }
  
    if (name === "tourType") {
      const selectedTourType = value;
      setSelectedTourType(selectedTourType);
      setFormData((prevData) => ({
        ...prevData,
        tourType: selectedTourType,
        totalAmount:
          selectedTour &&
          selectedTour.price &&
          formData.guestSize &&
          selectedTourType === "privado"
            ? selectedTour.price * 4 * parseInt(formData.guestSize)
            : selectedTour
            ? selectedTour.price * parseInt(formData.guestSize)
            : "",
      }));
      return;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  // ...
  // ...

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      guests: userData.slice(0, formData.guestSize).map((data, index) => ({
        dni: dni[index],
        name: data.nombres,
        lastName: `${data.apellidoPaterno} ${data.apellidoMaterno}`,
      })),
    }));
  }, [dni, userData, formData.guestSize]);

  // ...
  const generateReservationCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 8;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    setReservationCode(code); // Actualiza el estado con el código generado
    setFormData((prevData) => ({
      ...prevData,
      reservationCode: reservationCode, // Asigna el código generado al campo 'reservationCode' del estado 'formData'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData((prevData) => ({
      ...prevData,
      reservationCode: formData.reservationCode, // Asigna el código generado al campo 'reservationCode' del estado 'formData'
    }));

    setFormData((prevData) => ({
      ...prevData,
      guests: userData.slice(0, formData.guestSize).map((data, index) => ({
        dni: dni[index],
        name: userData[index].nombres,
        lastName: `${userData[index].apellidoPaterno} ${userData[index].apellidoMaterno}`,
      })),
    }));

    // Validación de campos vacíos
    if (
      formData.tourName.trim() === "" ||
      formData.fullName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.bookAt.trim() === ""
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    console.log(formData);
    // Enviar los datos al servidor
    axios
      .post(`${BASE_URL}booking`, formData)
      .then((response) => {
        // Procesar la respuesta del servidor
        console.log(response.data);
        // Mostrar una notificación de éxito
        toast.success("Reserva creada exitosamente");
        // Reiniciar el formulario
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          tourName: "",
          tourType: "",
          bookAt: getTodayDate(),
          guestSize: 0,
          guests: [],
          totalAmount: "",
          status: false,
          reservationCode: "",
        });
        setFormSubmitted(true);
      })
      .catch((error) => {
        // Manejar errores en caso de fallo en la solicitud
        console.error(error);
        toast.error("Error al crear la reserva");
      });
  };

  // Obtener la fecha actual en formato "YYYY-MM-DD"
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-8">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="tourName-label">Nombre del tour</InputLabel>
              <Select
                labelId="tourName-label"
                id="tourName"
                name="tourName"
                value={formData.tourName}
                onChange={handleChange}
                required
              >
                {tours.map((tour) => (
                  <MenuItem key={tour._id} value={tour.title}>
                    {tour.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="tourType-label">Tipo de tour</InputLabel>
              <Select
                labelId="tourType-label"
                id="tourType"
                name="tourType"
                disabled={selectedTour ? false : true}
                value={formData.tourType}
                onChange={handleChange}
                required
              >
                <MenuItem value="privado">Privado</MenuItem>
                <MenuItem value="grupal">Grupal</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre completo"
              name="fullName"
              disabled={selectedTour ? false : true}
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Tamaño del grupo"
              name="guestSize"
              value={formData.guestSize}
              onChange={handleChange}
              required
              disabled={selectedTour ? false : true}
              fullWidth
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono"
              disabled={selectedTour ? false : true}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo electrónico"
              disabled={selectedTour ? false : true}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Precio por persona"
              name="amount"
              value={
                selectedTour && formData.tourType === "privado"
                  ? selectedTour.price * 4
                  : selectedTour
                  ? selectedTour.price
                  : ""
              }
              // onChange={handleChange}
              required
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Precio total"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              required
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              label="Fecha de reserva"
              disabled={selectedTour ? false : true}
              name="bookAt"
              value={formData.bookAt}
              onChange={handleChange}
              required
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: getTodayDate(),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              label="Confirmar pago"
              className="text-slate-700"
              disabled={selectedTour ? false : true}
              control={
                <Checkbox
                  checked={formData.status} // Usamos el valor del estado en el campo checked
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      status: e.target.checked, // Actualizamos el estado con el nuevo valor
                    }))
                  }
                />
              }
            />

            <span className="text-red-400">
              * Marcar esta casilla si el pago ya fue confirmado
            </span>
          </Grid>
          <Grid item xs={12}>
            {quantity > 0 &&
              [...Array(quantity)].map(
                (
                  _,
                  i //el primer argumento de map es el valor, el segundo es el índice
                ) => (
                  <DniField
                    key={i}
                    index={i}
                    dni={dni} // Aquí pasamos el array completo en lugar de un valor individual
                    setDni={setDni}
                    userData={userData} // Aquí también pasamos el array completo
                    setUserData={setUserData}
                    disabled={selectedTour ? false : true}
                  />
                )
              )}
          </Grid>
          
          <Grid item xs={12}>
            <div className="flex items-center gap-4 my-3">
              <div
                className="w-48 h-14 bg-orange-600 hover:bg-orange-700 rounded text-slate-100 font-bold py-2 px-4 cursor-pointer flex items-center justify-center"
                onClick={generateReservationCode}
                disabled={selectedTour ? false : true}
              >
                <span>Generar Código</span>
              </div>

              <TextField
                label="Codigo de Reserva"
                disabled={true}
                name="reservationCode"
                value={formData.reservationCode}
                onChange={handleChange}
                required
                fullWidth
                className="w-64 font-bold"
                inputProps={{
                  autoComplete: "new-reservation-code",
                }}
              />
              <div className="flex flex-col">
              <span className="text-slate-400">
                - Doble click en el botón para generar el código.
              </span>
              <span className="text-slate-400">
                - Doble click en el codigo para copiarlo.
              </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="flex flex-col">
              <span className="text-slate-400">
                - Puede registrar una reserva sin confirmar el pago, pero
                recuerde confirmar el pago después desde el listado de reservas.
              </span>
              <span className="text-slate-400">
                - Solo se atenderán reservas confirmadas.
              </span>
            </div>
          </Grid>
          <Grid item xs={12}>
            <button
              type="submit"
              className="h-14 bg-blue-500 hover:bg-blue-700 rounded text-slate-100 font-bold py-2 px-4"
            >
              Crear reserva
            </button>
            <button
              type="button"
              className="h-14 ml-5 bg-red-500 hover:bg-red-700 rounded text-slate-100 font-bold py-2 px-4"
              onClick={goBack}
            >
              Volver atras
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateBooking;

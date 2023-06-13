import React, { useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField, Button } from "@mui/material";
import { BASE_URL } from "../../utils/config";
import "react-toastify/dist/ReactToastify.css";
import DniField from "../DNI/DniField";

const CreateBooking = ({ tour }) => {
  console.log(tour);
  const { price, reviews, title } = tour;
  const [tours, setTours] = useState([]);
  const { data: session, status } = useSession();
  const [booking, setBooking] = useState({
    userId: session ? session.user.name : "",
    userEmail: session ? session.user.email : "",
    tourName: "",
    phone: "",
    guestSize: "1",
    bookAt: selectedDate,
  });
  console.log(session);

  const isValidDate = (date) => {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
  };

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset hours, minutes, seconds and ms
    return new Date(date) >= today;
  };

  const handleBookAtChange = (e) => {
    const value = e.target.value;
    if (!isValidDate(value) || !isFutureDate(value)) {
      toast.error("Por favor ingresa una fecha válida y en el futuro.");
      return;
    }
    setBooking((prev) => ({ ...prev, bookAt: value }));
    toast.success("Fecha de reserva válida.");
  };

  //Eleccion de tour

  const [tourType, setTourType] = useState("group"); // 'group' or 'private'

  const totalAmount =
    Number(tour.price) *
    (tourType === "private" ? 4 : 1) *
    Number(booking.guestSize);

  const handleGuestSizeChange = (e) => {
    const value = Number(e.target.value);

    if (tourType === "private" && (value < 1 || value > 2)) {
      toast.error(
        "Para un tour privado, el número de personas debe ser entre 1 y 2."
      );
      return;
    }

    const availableSeats = maxGuests - currentGuests;
    if (value > availableSeats) {
      toast(`Only ${availableSeats} seats left for this tour.`);
      return;
    }

    setBooking((prev) => ({ ...prev, guestSize: value }));
  };

  // Declaramos 'quantity' antes de su uso.
  const [quantity, setQuantity] = useState(1);
  const [dni, setDni] = useState(new Array(1).fill(""));
  const [userData, setUserData] = useState(new Array(1).fill({}));

  useEffect(() => {
    // Si el número de invitados cambia, reiniciar los valores de DNI y userData
    setDni(new Array(booking.guestSize).fill(""));
    setUserData(new Array(booking.guestSize).fill({}));
    setQuantity(booking.guestSize);
  }, [booking.guestSize]);

  const [maxGuests, setMaxGuests] = useState(0);
  const [currentGuests, setCurrentGuests] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tour")
      .then((response) => {
        // Manejar la respuesta exitosa
        const toursData = response.data;
        setTours(toursData);
      })
      .catch((error) => {
        // Manejar el error
        console.error(error);
      });
  }, []);
  console.log(tour.price);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/booking`, booking)
      .then((response) => {
        console.log(response.data);
        setBooking((prev) => ({
          ...prev,
          tourName: "",
          phone: "",
          guestSize: "1",
        }));
        toast.success("Reserva creada con éxito.");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Ocurrió un error al crear la reserva.");
      });
  };

  return (

      
    <div className="w-full">
      <h2>Crear nueva reserva</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full mt-5 grid grid-cols-2 gap-10"
      >
        <TextField
          label="Nombre del Tour:"
          select
          value={booking.tourName}
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, tourName: e.target.value }))
          }
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Seleccione un tour</option>
          {tours.map((tour) => (
            <option key={tour._id} value={tour.title}>
              {tour.title}
            </option>
          ))}
        </TextField>
        <div>
          <h5>Tipo de tour</h5>
          <select
            id="tourType"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
          >
            <option value="group">Tour grupal</option>
            <option value="private">Tour privado</option>
          </select>
        </div>
        <TextField
          label="Número de invitados:"
          type="number"
          id="guestSize"
          required
          value={booking.guestSize}
          onChange={handleGuestSizeChange}
          min="1"
        />

        <TextField
          label="Teléfono:"
          type="tel"
          value={booking.phone}
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, phone: e.target.value }))
          }
        />

        <div className="d-flex align-items-center gap-3">
          <input
            type="date"
            placeholder=""
            id="bookAt"
            required
            onChange={handleBookAtChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div>
          {/* Agregar campos de DNI */}
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
                />
              )
            )}
        </div>

        {/*============== booking botton ====================*/}
        <div>
          <div className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              S/.{tour.price} <i className="ri-close-line"></i> 1 persona
            </h5>
            <span>S/.{tour.price}</span>
          </div>
        </div>

        <div>
          <div className="border-0 px-0 total">
            <h5>Total</h5>
            <span>S/.{totalAmount}</span>
          </div>
        </div>

        {/* Aquí puedes añadir más campos de texto o cualquier otro componente que desees */}

        <Button variant="contained" type="submit" className="w-52">
          Crear Reserva
        </Button>
      </form>
    </div>
  );
};

export default CreateBooking;

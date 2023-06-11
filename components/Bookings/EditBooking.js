import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Form, FormGroup } from "reactstrap";
import DniField from '../DNI/DniField.jsx';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from "../../context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

const EditBooking = ({ bookingId }) => {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);
  const [booking, setBooking] = useState(null);
  const [dni, setDni] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/tours`)
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`${BASE_URL}/booking/${bookingId}`)
      .then(response => {
        setBooking(response.data);
        setDni(new Array(response.data.guestSize).fill(""));
        setUserData(new Array(response.data.guestSize).fill({}));
      })
      .catch(error => {
        console.error(error);
      });
  }, [bookingId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${BASE_URL}/booking/${bookingId}`, booking)
      .then((response) => {
        console.log(response.data);
        toast.success('Reserva actualizada con éxito.');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Ocurrió un error al actualizar la reserva.');
      });
  };

  if (!booking) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Editar reserva</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Nombre del Tour:</label>
          <select
            required
            value={booking.tourName}
            onChange={(e) => setBooking((prev) => ({ ...prev, tourName: e.target.value }))}
          >
            <option value="">Seleccione un tour</option>
            {tours.map(tour => (
              <option key={tour._id} value={tour.title}>
                {tour.title}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label>Número de invitados:</label>
          <input
            type="number"
            required
            value={booking.guestSize}
            onChange={(e) => {
              setBooking((prev) => ({ ...prev, guestSize: e.target.value }));
              setDni(new Array(e.target.value).fill(""));
              setUserData(new Array(e.target.value).fill({}));
            }}
          />
        </FormGroup>
        <FormGroup>
          <label>Teléfono:</label>
          <input
            type="tel"
            required
            value={booking.phone}
            onChange={(e) => setBooking((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </FormGroup>

        {/* Agregar campos de DNI */}
        {dni.map((_, i) => (
          <DniField
            key={i}
            index={i}
            dni={dni}
            setDni={setDni}
            userData={userData}
            setUserData={setUserData}
          />
        ))}

        <button type="submit">Actualizar Reserva</button>
      </Form>
    </div>
  );
}

export default EditBooking;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import { Modal, Fade, Button } from "@mui/material";

const ContactDetail = ({ open, handleClose }) => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Obtiene el ID desde la URL

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/contact/${id}`);
        console.log(res.data); // Imprime los datos obtenidos

        setContact(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error al obtener el contacto");
        console.log(error); // Imprime el error

        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!contact) {
    return <p>No se encontró el contacto</p>;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      className="flex justify-center items-center"
    >
      <Fade in={open} className="w-3/5 bg-slate-100 rounded overflow-hidden">
        {/* Contenido de la ventana modal */}
        <div>
          <div className="flex items-center justify-between py-4 px-4 bg-slate-700">
            <span className=" text-slate-50 text-2xl mb-2 font-bold">
              Detalle del Contacto
            </span>
            {/* Botón de cierre */}
            <button
              className="bg-red-500 hover:bg-red-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
          {/* Contenedor para mostrar los datos del contacto */}
          <div className="flex gap-5 py-8">
            {/* Contenedor para mostrar campos del contacto */}
            <div className="flex-grow w-3/12 flex flex-col gap-4 px-4 py-4 border-2 border-slate-700 border-solid rounded m-3">
              <div className="flex flex-row items-center justify-between ">
                <span className="font-bold text-lg text-slate-800">
                  Nombre:{" "}
                </span>
                <span className="text-slate-800">{contact.name}</span>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <span className="font-bold text-lg text-slate-800">
                  Email:{" "}
                </span>
                <span className="text-slate-800">{contact.email}</span>
              </div>
              <div className="flex flex-row items-center justify-between ">
                <span className="font-bold text-lg text-slate-800">
                  Mensaje:
                </span>
                <span className="text-slate-800">{contact.message}</span>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ContactDetail;

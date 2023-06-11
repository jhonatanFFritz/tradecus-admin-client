import React, { useState } from "react";
import { Modal, Fade, Button } from "@mui/material";
const TourDetail = ({ open, handleClose, selectedTour }) => {
  console.log(selectedTour);
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
              Detalle del Tour
            </span>
            {/* Botón de cierre */}
            <button
              className="bg-red-500 hover:bg-red-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
              onClick={handleClose}
            >
              Cerrar
            </button>
          </div>
          {/* Contenedor para mostrar los datos del tour */}
          <div className="flex gap-5 py-8">
            {/* Contenedor para mostrar campos del tour */}
            <div className="flex-grow w-3/12 flex flex-col gap-4 px-4 py-4 border-2 border-slate-700 border-solid rounded m-3">
              {selectedTour && (
                <>
                  <div className="flex flex-row items-center justify-between ">
                    <span className="font-bold text-lg text-slate-800">
                      Nombre:{" "}
                    </span>
                    <span className="text-slate-800">{selectedTour.title}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between ">
                    <span className="font-bold text-lg text-slate-800">
                      Precio:{" "}
                    </span>
                    <span className="text-slate-800">
                      {" "}
                      {selectedTour.price}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between ">
                    <span className="font-bold text-lg text-slate-800">
                      Ciudad:
                    </span>
                    <span className="text-slate-800">{selectedTour.city}</span>
                  </div>
                  
                  <div className="flex flex-row items-center justify-between ">
                    <span className="font-bold text-lg text-slate-800">
                      Distancia:
                    </span>
                    <span className="text-slate-800">
                      {selectedTour.duration}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between ">
                    <span className="font-bold text-lg text-slate-800">
                      Descripción:{" "}
                    </span>
                    <span className="text-slate-800">{selectedTour.dec}</span>
                  </div>
                  <div className="flex flex-row items-center justify-between ">
                    <span className="font-bold text-lg text-slate-800">
                      Número de personas:{" "}
                    </span>
                    <span className="text-slate-800">{selectedTour.maxGroupSize}</span>
                  </div>
                </>
              )}
            </div>
            {/* Contenedor para mostrar las imagenes */}
            <div className="flex-grow w-6/12 flex flex-col">
              <span className="font-bold text-lg text-slate-800 pb-2">
                Imagenes:
              </span>
              <div className="grid grid-cols-2 gap-4">
                {selectedTour && selectedTour.photos.length > 0 ? (
                  selectedTour.photos.map((image) => (
                    <img
                      key={image.public_id}
                      src={image.secure_url}
                      alt={`Imagen del Tour: ${selectedTour.title}`}
                      className="w-full h-32 object-cover rounded-md transition-transform duration-300 ease-in-out transform-gpu"
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <span className="text-gray-500">
                      Obteniendo las imágenes
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default TourDetail;

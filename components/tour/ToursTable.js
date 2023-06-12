import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import TourDetail from "./TourDetail";
import TourEdit from "./TourEdit";

const ToursTable = ({ tours, rowsPerPageOptions, setTours }) => {
  const [deleteTourId, setDeleteTourId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedTourEdit, setSelectedTourEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const [modalOpenDetail, setModalOpenDetail] = useState(false);
  const [modalOpenEdit, setModalOpenEdit] = useState(false);

  const handleDeleteTour = (tourId) => {
    setDeleteTourId(tourId);
    setDeleteConfirmationOpen(true);
  };
  const handleConfirmDelete = () => {
    // Eliminar el tour de la lista de tours
    const updatedTours = tours.filter((tour) => tour._id !== deleteTourId);
    // Actualizar la lista de tours
    setTours(updatedTours);

    axios
      .delete(`http://localhost:5000/tour/${deleteTourId}`)
      .then((response) => {
        // Manejar la respuesta exitosa de la eliminación en la base de datos
        console.log("Tour eliminado de la base de datos");
      })
      .catch((error) => {
        // Manejar el error de la eliminación en la base de datos
        console.error("Error al eliminar el tour de la base de datos:", error);
      });

    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleOpenModal = (tour) => {
    setSelectedTour(tour);
    setModalOpenDetail(true);
  };

  const handleCloseModal = () => {
    setModalOpenDetail(false);
  };

  // funciones para el modal de edit tour
  useEffect(() => {
    // Obtener la lista de tours al cargar el componente
    fetchTours();
  }, []);

  const fetchTours = () => {
    // Realizar una solicitud HTTP para obtener la lista de tours actualizada
    axios
      .get("http://localhost:5000/tours")
      .then((response) => {
        setTours(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTour = (updatedTour) => {
    // Actualizar el tour específico en la lista de tours
    const updatedTours = tours.map((tour) => {
      if (tour._id === updatedTour._id) {
        return updatedTour;
      }
      return tour;
    });
    setTours(updatedTours);
  };

  const handleOpenEdit = (tour) => {
    setSelectedTourEdit(tour);
    setModalOpenEdit(true);
  };

  const handleCloseModalEdit = () => {
    setModalOpenEdit(false);
  };
  //finde edit tour
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tours.length - page * rowsPerPage);

  return (
    <>
      <TableContainer className="mt-3  rounded border border-solid  border-slate-400  ">
        <Table>
          <TableHead className="bg-slate-700">
            <TableRow>
              <TableCell className="text-white font-bold">Titulo</TableCell>
              <TableCell className="text-white font-bold">Precio</TableCell>
              <TableCell className="text-white font-bold">Ciudad</TableCell>

              <TableCell className="text-white font-bold">Duración</TableCell>
              <TableCell className="text-white font-bold">Acciones</TableCell>
              {/* Add more table headers if needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tours.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tours
            ).map((tour) => (
              <TableRow key={tour._id}>
                <TableCell className="border-slate-700">{tour.title}</TableCell>
                <TableCell className="border-slate-700">
                  USD {tour.price}
                </TableCell>
                <TableCell className="border-slate-700">{tour.city}</TableCell>
                <TableCell className="border-slate-700">
                  {tour.duration}
                </TableCell>

                <TableCell className=" w-auto border-slate-700">
                  <div className="flex items-center justify-around">
                    <button
                      className="bg-green-500 hover:bg-green-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
                      onClick={() => handleOpenModal(tour)}
                    >
                      Detalles
                    </button>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
                      onClick={() => handleOpenEdit(tour)}
                    >
                      Editar
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
                      onClick={() => handleDeleteTour(tour._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </TableCell>
                {/* Add more table cells based on your tours structure */}
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={tours.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <TourDetail
        open={modalOpenDetail}
        handleClose={handleCloseModal}
        selectedTour={selectedTour}
      />
      <TourEdit
        open={modalOpenEdit}
        handleClose={handleCloseModalEdit}
        selectedTourEdit={selectedTourEdit}
        updateTour={updateTour}
      />

      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que quieres eliminar este tour?</p>
        </DialogContent>
        <DialogActions>
          <button
            className="bg-amber-500 hover:bg-amber-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
            onClick={handleCancelDelete}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 rounded text-slate-100 font-bold py-2 px-4 rounde"
            onClick={handleConfirmDelete}
          >
            Eliminar
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ToursTable;

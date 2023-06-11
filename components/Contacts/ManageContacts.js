import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
} from "@mui/material";
import { BASE_URL } from '../../utils/config';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/contact`);
      setContacts(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al obtener los contactos");
      setLoading(false);
    }
  };

  const handleCheck = async (contactId) => {
    setDeleteContactId(contactId);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    // Eliminar el contacto de la lista de contactos
    const updatedContacts = contacts.filter((contact) => contact._id !== deleteContactId);
    // Actualizar la lista de contactos
    setContacts(updatedContacts);

    axios
      .delete(`${BASE_URL}/contact/${deleteContactId}`)
      .then((response) => {
        // Handle successful deletion from the database
        toast.success("Contacto atendido y eliminado correctamente");
      })
      .catch((error) => {
        // Handle error deleting contact from the database
        toast.error("Error al eliminar el contacto");
      });

    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, contacts.length - page * rowsPerPage);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Acciones</TableCell>
              <TableCell>Atendido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : contacts
            ).map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.message}</TableCell>
                <TableCell>
                  <input type="checkbox" onChange={() => handleCheck(contact._id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/detail_contact/${contact._id}`}>Ver</Link>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={deleteConfirmationOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro que fue atendido?</p>
        </DialogContent>
        <DialogActions>
         {/* <Button onClick={handleCancelDelete}>Cancelar</Button>
          <Button onClick={handleConfirmDelete}>Eliminar</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageContacts;

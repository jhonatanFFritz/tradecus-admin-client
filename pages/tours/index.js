import React, { useEffect, useState } from "react";
import ActionCard from "../../components/ActionCard";
import axios from "axios";
import ToursTable from "../../components/tour/ToursTable";
function Tours() {
  const [tours, setTours] = useState([]);

  const rowsPerPageOptions = [5, 10, 25];

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

  return (
    <div>
      <p className="text-gray-700 text-3xl mb-2 font-bold">Tour</p>
      <div className="w-fit">
        <ActionCard title="Nuevo Tour" url="/tours/newTour" />
      </div>
      <div>
        <ToursTable tours={tours} rowsPerPageOptions={rowsPerPageOptions} setTours={setTours}/>
      </div>
    </div>
  );
}

export default Tours;

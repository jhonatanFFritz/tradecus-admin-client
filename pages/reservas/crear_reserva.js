import React,{useState, useEffect}from 'react'
import CreateBooking from '../../components/Bookings/CreateBooking'
import { useSession } from "next-auth/react";
import { BASE_URL } from '../../utils/config';
import axios from "axios";


function NuevaReserva() {
  const { data: session, status } = useSession();

  const [tours, setTours] = useState([]);


  //Hasemos un request a la api para obtener los tours
  useEffect(() => {
    const getTours = async () => {
      const res = await axios.get("http://localhost:5000/tour");
      setTours(res.data);
    };
    getTours();
  }, []);


  
  return (
    <div>
      <p className="text-gray-700 text-3xl mb-2 font-bold">Agendar una reserva</p>
      <div>
        <CreateBooking tours={tours} session={session}/>
      </div>
    </div>
  )
}

export default NuevaReserva
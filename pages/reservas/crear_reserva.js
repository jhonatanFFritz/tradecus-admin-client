import React from 'react'
import CreateBooking from '../../components/Bookings/CreateBooking'

function crear_reserva() {
  return (
    <div>
      <p className="text-gray-700 text-3xl mb-2 font-bold">Agendar una reserva</p>
      <div>
        <CreateBooking />
      </div>
    </div>
  )
}

export default crear_reserva
import React from "react";
import ActionCard from "../../components/ActionCard";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import MyCalendar from "../../components/MyCalendar"

function Reservas() {
  return (
    <div className="flex flex-col gap-5">
       <p className="text-gray-700 text-3xl mb-2 font-bold">Reservas</p>
      <div className="grid lg:grid-cols-4 gap-5">
        <ActionCard
          title="Nueva Reserva"
          icon={<SquaresPlusIcon className="h-6 w-6 text-indigo-700 hover:text-white"/>}
          url="/reservas/crear_reserva"
        />
        
        
      </div>
      <div>
        <MyCalendar/>
      </div>
    </div>
  );
}

export default Reservas;

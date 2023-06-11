import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  moment.locale('es'); // Configura moment.js para usar el idioma español

  const events = [
    {
      title: 'Evento 1',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Evento 2',
      start: new Date(),
      end: new Date(),
    },
    // Agrega más eventos según sea necesario
  ];

  const handleDoubleClick = event => {
    // Aquí puedes manejar la lógica para registrar un evento
    console.log('Evento registrado:', event);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        onSelectSlot={handleDoubleClick} // Agrega el controlador de eventos para doble clic en un día
      />
    </div>
  );
};

export default MyCalendar;

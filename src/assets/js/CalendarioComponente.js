import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dateClick
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalendarComponent = () => {
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt('Enter the event title:');
    if (title) {
      const newEvent = {
        title,
        start: info.dateStr,
        allDay: true
      };
      setEvents([...events, newEvent]);

      // Notify user
      toast.success('Event added successfully!');
      
      // Send email notification (this requires backend)
      // axios.post('/api/send-email', { event: newEvent })
      //   .then(response => toast.success('Notification sent!'))
      //   .catch(error => toast.error('Failed to send notification'));
    }
  };

  return (
    <div >
      <button onClick ={() => setCalendarVisible(!calendarVisible)}>
        {calendarVisible ? 'Hide Calendar' : 'Show Calendar'}
      </button>
      {calendarVisible && (
        <div style={{ marginTop: '20px' }}>
          <FullCalendar
            plugins= {[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            dateClick={handleDateClick}
            events={events}
          />
          < ToastContainer />
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;

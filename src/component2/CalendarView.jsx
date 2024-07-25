import React, { useContext, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarView.css'; 

import { EventContext } from '../contexts/EventContext';

const CalendarView = () => {
    const { entities } = useContext(EventContext);
    const [selectedDate, setSelectedDate] = useState(null);
    const events=entities.events;

    const hasEventsOnDate = (date) => {
        const eventOnDate = events.find(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
        return !!eventOnDate;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            return hasEventsOnDate(date) ? 'has-events' : '';
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
     
    };

    return (
        <div className="calendar-view">
            <h2>Calendar View</h2>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default CalendarView;

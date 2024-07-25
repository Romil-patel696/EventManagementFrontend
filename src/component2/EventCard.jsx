// EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.name}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>{event.location}</p>
      <Link to={`/event/${event.eventId}`}>View Details</Link>
    </div>
  );
};

export default EventCard;

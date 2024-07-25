import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EventContext } from '../contexts/EventContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchEntity, deleteEntity } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event details', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteEntity('events', id);
    fetchEntity('events', 'events');
    navigate('/my-events');
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details">
      <div style={{ padding: '20px' }}>
        <h2>{event.name}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(event.end_date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Category:</strong> {event.CategorieName}</p>
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Capacity:</strong> {event.capacity}</p>
        <p><strong>Registration Link:</strong> {event.registration_link}</p>
        <p><strong>Event Website:</strong> {event.event_website}</p>
        <p><strong>Contact Email:</strong> {event.contact_email}</p>
        <p><strong>Contact Phone:</strong> {event.contact_phone}</p>
        <p><strong>Favorite:</strong> {event.favorite ? 'Yes' : 'No'}</p>
        <p><strong>Importance:</strong> {event.importance}</p>
        <p><strong>Notes:</strong> {event.notes}</p>
        <img src={event.image} alt="Event" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
      </div>
      <button onClick={handleDelete}>Delete Event</button>
      <Link className="edit-event" to={`/edit-event/${id}`}>
        <button>Edit Event</button>
      </Link>
    </div>
  );
};

export default EventDetails;

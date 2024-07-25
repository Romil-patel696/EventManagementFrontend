import React, { useContext, useState } from 'react';
import { EventContext } from '../contexts/EventContext';
import './AddEvent.css';
import { CgEnter } from 'react-icons/cg';

const AddEvent = () => {
  const { handleAddEvent } = useContext(EventContext);

  const [event, setEvent] = useState({
    name: '',
    date: '',
    end_date: '',
    location: '',
    description: '',
    organizer: '',
    CategorieName: '',
    image: '',
    capacity: '',
    registration_link: '',
    event_website: '',
    contact_email: '',
    contact_phone: '',
    favorite: 'no', 
    importance: 'Low', 
    notes: '',
    user_Id: '1' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    // console.log(e);
    // console.log(event)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date to MySQL DATETIME format (if needed)
    const formattedEvent = {
      ...event,
      date: new Date(event.date).toISOString().slice(0, 19).replace('T', ' '), // Assuming event.date is a valid date string
      end_date: event.end_date ? new Date(event.end_date).toISOString().slice(0, 19).replace('T', ' ') : null, // Convert if provided
      capacity: parseInt(event.capacity), // Convert capacity to integer

    };

    try {
      await handleAddEvent(formattedEvent);
      setEvent({
        name: '',
        date: '',
        end_date: '',
        location: '',
        description: '',
        organizer: '',
        CategorieName: '',
        image: '',
        capacity: '',
        registration_link: '',
        event_website: '',
        contact_email: '',
        contact_phone: '',
        favorite: 'no',
        importance: 'Low',
        notes: '',
        user_Id: 1
      });
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event.');
    }
    console.log(formattedEvent);
  };


  return (
    <div className="add-event">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Event Name"
            value={event.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={event.end_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={event.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="organizer">organizer</label>
          <input
            type="text"
            name="organizer"
            id="organizer"
            placeholder="Organizer"
            value={event.organizer}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="CategorieName"> CategorieName</label>
          <input
            type="text"
            name="CategorieName"
            id="CategorieName"
            placeholder="CategorieName"
            value={event.CategorieName}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="image"
            value={event.image}
            onChange={handleChange}
            
          /></div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            name="capacity"
            id="capacity"
            placeholder="capacity"
            value={event.capacity}
            onChange={handleChange}
          
          />
        </div>
        <div className="form-group">
          <label htmlFor="registration_link">Registration Link </label>
          <input
            type="text"
            name="registration_link"
            id="registration_link"
            placeholder="registration_link"
            value={event.registration_link}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="event_website">Event Website</label>
          <input
            type="text"
            name="event_website"
            id="event_website"
            placeholder="event_website"
            value={event.event_website}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact_email">Contact Email</label>
          <input
            type="text"
            name="contact_email"
            id="contact_email"
            placeholder="contact_email"
            value={event.contact_email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact_phone">Contact Phone</label>
          <input
            type="text"
            name="contact_phone"
            id="contact_phone"
            placeholder="contact_phone"
            value={event.contact_phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label >Favorite</label>
          
            <div style={{ display: 'flex',
              gap : '10px'
             }}>
              <label>YES
              </label>
              <div style={{ display: 'inline' }}>
                <input
                  type="checkbox"
                  name="favorite"
                  value='yes'
                  checked={event.favorite == 'yes'}
                  onChange={handleChange}
                /></div>
            </div>
            <div style={{ display: 'flex',
              gap : '15px'
             }}>
              <label>NO
              </label>
              <div style={{ display: 'inline' }}>
                <input
                 
                  type="checkbox"
                  name="favorite"
                  value='no'
                  checked={event.favorite == 'no'}
                  onChange={handleChange}
                /></div></div>
          
        </div>


        <div className="form-group">
          <label>Importance</label>
          <div style={{ display : 'flex' ,
            gap : '0px'
          }}>
            <label >  Low
            </label>
              <input
               
                type="radio"
                name="importance"
                value="Low"
                checked={event.importance === 'Low'}
                onChange={handleChange}
              />
            </div>
            <div style={{ display : 'flex', 
              gap : '0px'
            }}>
            <label > Medium
            </label>
              <input
             
                type="radio"
                name="importance"
                value="Medium"
                checked={event.importance === 'Medium'}
                onChange={handleChange}
              />
             </div>
             <div style={{ display : 'flex' }}>
            <label > High
            </label>
              <input
             
                type="radio"
                name="importance"
                value="High"
                checked={event.importance === 'High'}
                onChange={handleChange}
              />
             
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>Notes</label>
        <textarea
          name="notes"
          value={event.notes}
          onChange={handleChange}
          style={{ width: '100%', height: '100px', padding: '10px', fontSize: '16px' }}
        />
      </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;

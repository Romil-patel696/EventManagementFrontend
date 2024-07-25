import  { createContext, useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

const initialEntities = {
  events: [],
  users: [],
  attachment: []
};

const EventContext = createContext(initialEntities);

const EventProvider = ({ children }) => {
  const [entities, setEntities] = useState(initialEntities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchEntity = useCallback(async (entityName, endpoint) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/${endpoint}`);
      setEntities(prevEntities => ({
        ...prevEntities,
        [entityName]: response.data,
      }));
    } catch (error) {
      setError(error);
      console.error(`Error fetching ${entityName}`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEntity = useCallback(async (entityName, id) => {
    try {
      await axios.delete(`http://localhost:5000/${entityName}/${id}`);
      setEntities(prevEntities => ({
        ...prevEntities,
        [entityName]: prevEntities[entityName].filter(entity => entity.eventId !== id),
      }));
      fetchEntity(entityName, entityName);
    } catch (error) {
      console.error(`Error deleting ${entityName}`, error);
    }
  }, [fetchEntity]);

  const handleAddEvent = useCallback(async (event) => {
    try {
      await axios.post('http://localhost:5000/events', event);
      fetchEntity('events', 'events');
    } catch (error) {
      setError(error);
      console.error('Error adding event', error);
    }
  }, [fetchEntity]);

  const updateEvent = useCallback(async (id, event) => {
    try {
      await axios.put(`http://localhost:5000/events/${id}`, event);
      fetchEntity('events', 'events');
    } catch (error) {
      setError(error);
      console.error('Error updating event', error);
    }
  }, [fetchEntity]);

  useEffect(() => {
    fetchEntity('events', 'events');
    fetchEntity('users', 'users');
    fetchEntity('attachment', 'attachments');
  }, [fetchEntity]);

  return (
    <EventContext.Provider value={{
      entities,
      loading,
      error,
      fetchEntity,
      deleteEntity,
      handleAddEvent,
      updateEvent
    }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };


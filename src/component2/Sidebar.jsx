import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { EventContext  } from '../contexts/EventContext';

const Sidebar = () => {
  const { entities,  } = useContext(EventContext);

  const events = entities.events;
  console.log(events);
  const favoriteEvents=events.filter(event => event.favorite === 'yes');


  return (
    <div className="sidebar">
      <div className="profile">
        <img src="profile-icon.png" alt="Profile" />
        <h3>Username</h3>
        <p>user@example.com</p>
      </div>
      <div className="nav">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/my-events">
          <button>My Events</button>
        </Link>
        <Link to="/add-event">
          <button>Add Event</button>
        </Link>
        <Link to="/settings">
          <button>Settings</button>
        </Link>
      </div>
      <div className="favorites">
        <h4>Favorites</h4>
        <ul>
          {favoriteEvents.length > 0 ? (
            favoriteEvents.map((event) => (
              
              <li key={event.eventId} style={ { wordBreak:'break-word'}}>
                <Link style={{textDecoration:'none', color:'black', fontSize:'25px'}} to={`/event/${event.eventId}`}>{event.name}</Link>
              </li>
            ))
          ) : (
            <li>No favorite events yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

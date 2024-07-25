// import { useContext, useEffect, useState } from "react";
// import EventCard from "./EventCard";
// // import axios from 'axios';
// import "./MyEvents.css";
// import SearchBar from "./SearchBar";
// import { EventContext } from "../contexts/EventContext";

// const MyEvents = () => {
   
//   const { entities, loading, error, fetchEntity} = useContext(EventContext);
// //   const events=useState(entities.events[0])
// // console.log(entities);
// const [events, setEvents]=useState(entities.events);
// console.log(events);

//   useEffect(()=>{fetchEntity('events', 'events');}, []);
//   const [filteredEvents, setFilteredEvents] = useState(events);
//   const handleSearch = (searchTerm) => {
//     if (Array.isArray(events)) {
//       const filtered = events.filter((event) =>
//         event.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredEvents(filtered);
//     } else {
//       setFilteredEvents([]);
//     }
//   };

//   const groupEventsByDate = (events) => {
//     const groupedEvent = {};
//     events.forEach((event) => {
//       const date = event.date;
//       // This condition checks if there is already an entry in the
//       // groupedEvents object for the given date as a key..if not => false/undefined
//       if (!groupedEvent[date]) {
//         groupedEvent[date] = [];
//       }
//       // if there is no key name date (current event elem date ) so add it and value is a [].
//       groupedEvent[date].push(event);
//     });
//     return groupedEvent;
//     //   finnaly it will have  like this
//     //   {
//     //     '2024-07-13': [
//     //       { date: '2024-07-13', name: 'Event 1' },
//     //       { date: '2024-07-13', name: 'Event 3' }
//     //     ],
//     //     '2024-07-14': [
//     //       { date: '2024-07-14', name: 'Event 2' }
//     //     ]
//     //   }
//     //  we are returning a object
//   };

//   const groupedEvents = groupEventsByDate(filteredEvents);
//   if (loading) {
//     return <div>Loading...</div>;
//   }
// //   console.log(`groupedevent${groupedEvents}`)
// //   console.log(groupedEvents)

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
//   // console.log(groupedEvents);

//   return (
//     <div className="my-events">
//       <h2>My Events</h2>
//       <div className="search-container">
//         <SearchBar onSearch={handleSearch} />
//       </div>
//       <div className="event-sections">
//         {Object.keys(groupedEvents)
//           .sort()
//           .map((date) => {
//             const Nowdate = new Date(date);
//             const options = {
//               weekday: "long",
//               day: "2-digit",
//               month: "2-digit",
//               year: "numeric",
//             };
//             const formattedDate = Nowdate.toLocaleDateString("en-GB", options);

//             return (
//               <div key={date} className="event-group">
//                 <h3>{formattedDate}</h3>
//                 <div className="event-row">
//                   {groupedEvents[date]
//                     .sort((a, b) => new Date(a.date) - new Date(b.date))
//                     .map((event) =>{
//                         // console.log(event)
//                         return <EventCard key={event.eventId} event={event} />
//                     })}
//                 </div>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default MyEvents;


import { useContext, useEffect, useState } from "react";
import EventCard from "./EventCard";
import "./MyEvents.css";
import SearchBar from "./SearchBar";
import { EventContext } from "../contexts/EventContext";

const MyEvents = () => {
  const { entities, loading, error, fetchEntity } = useContext(EventContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEntity('events', 'events');
  }, [fetchEntity]);

  useEffect(() => {
    setEvents(entities.events);
  }, [entities.events]);

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  const handleSearch = (searchTerm) => {
    if (Array.isArray(events)) {
      const filtered = events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]);
    }
  };

  const groupEventsByDate = (events) => {
    const groupedEvent = {};
    events.forEach((event) => {
      const date = event.date;
        // This condition checks if there is already an entry in the
       // groupedEvents object for the given date as a key..if not => false/undefined
      if (!groupedEvent[date]) {
        groupedEvent[date] = [];
         // if there is no key name date (current event elem date ) so add it and value is a [].
      }
      groupedEvent[date].push(event);
      //   finnaly it will have  like this
      //   {
      //     '2024-07-13': [
        //       { date: '2024-07-13', name: 'Event 1' },
        //       { date: '2024-07-13', name: 'Event 3' }
        //     ],
        //     '2024-07-14': [
          //       { date: '2024-07-14', name: 'Event 2' }
          //     ]
          //   }
          //  we are returning a object
    });
    return groupedEvent;
  };

  const groupedEvents = groupEventsByDate(filteredEvents);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-events">
      <h2>My Events</h2>
      <div className="search-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="event-sections">
        {Object.keys(groupedEvents)
          .sort()
          .map((date) => {
            const Nowdate = new Date(date);
            const options = {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            };
            const formattedDate = Nowdate.toLocaleDateString("en-GB", options);

            return (
              <div key={date} className="event-group">
                <h3>{formattedDate}</h3>
                <div className="event-row">
                  {groupedEvents[date]
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event) => (
                      <EventCard key={event.eventId} event={event} />
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyEvents;

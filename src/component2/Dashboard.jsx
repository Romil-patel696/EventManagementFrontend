import React, { useContext, useEffect, useState } from 'react';
import EventList from './EventList';
import { Link } from 'react-router-dom';

import { EventContext } from '../contexts/EventContext';
import CalanderView from './CalendarView';

const Dashboard = () => {
  const { entities} = useContext(EventContext);
  // const { entities} = useContext(EventContext2);
    const events=entities.events;
  const [statistics, setStatistics] = useState({});
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    calculateStatistics();
    fetchFeaturedEvents();
    fetchNotifications();
    fetchAnnouncements();
    fetchTips();
  }, [events]);

  const calculateStatistics = () => {
    const totalEvents = events.length;
    const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
    const frequentLocations = [...new Set(events.map(event => event.location))].length;
    const eventCategories = [...new Set(events.map(event => event.CategorieName))].length;

    setStatistics({
      totalEvents,
      upcomingEvents,
      frequentLocations,
      eventCategories
    });
  };

  const fetchFeaturedEvents = () => {
   
    const featured = events.filter(event => event.featured);
    setFeaturedEvents(featured);
  };

  const fetchNotifications = () => {
   
    setNotifications(["No new notifications"]);
  };

  const fetchAnnouncements = () => {
 
    setAnnouncements(["No new announcements"]);
  };

  const fetchTips = () => {
   
    setTips(["Check out our tips to use the app more effectively."]);
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Event Management</h2>
      <p>Manage your events efficiently and effectively with our app.</p>

      <div className="statistics">
        <Link to="/my-events" className="stat">
          <div>
            <h3>Total Events</h3>
            <p>{statistics.totalEvents}</p>
          </div>
        </Link>
        <div className="stat">
          <h3>Upcoming Events</h3>
          <p>{statistics.upcomingEvents}</p>
        </div>
        <div className="stat">
          <h3>Frequent Locations</h3>
          <p>{statistics.frequentLocations}</p>
        </div>
        <div className="stat">
          <h3>Event Categories</h3>
          <p>{statistics.eventCategories}</p>
        </div>
      </div>

      <div className="notifications">
        <h3>Notifications</h3>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>

      <div className="featured-events">
        <h3>Featured Events</h3>
        <EventList events={featuredEvents} />
      </div>

      <div className="mini-calendar">
        <h3>Calendar View</h3>
       
        <CalanderView/>
      </div>

      <div className="news">
        <h3>News & Announcements</h3>
        <ul>
          {announcements.map((announcement, index) => (
            <li key={index}>{announcement}</li>
          ))}
        </ul>
      </div>

      <div className="tips">
        <h3>Tips & Tutorials</h3>
        <ul>
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

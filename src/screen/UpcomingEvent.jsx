import React from 'react';
import del from '../assets/material-symbols_delete-outline.png';

const UpcomingEvent = () => {
    const upcomingEvents = [
      { name: 'Zoom Call', time: '21:00 PM' },
      { name: 'Stand Up', time: '21:00 PM' },
    ];
  
    return (
      <div className="w-[14rem] flex flex-col items-start justify-between overflow-y-auto" style={{ maxHeight: '20vh' }}>
        {upcomingEvents.map((event, index) => (
          <div key={index}>
            <div className="w-[14rem] flex items-center justify-between">
              <div className="text-center text-neutral-100 text-[17px] font-medium font-['Inter']">{event.name}</div>
              <img src={del} alt="Logo" className="w-3.5 h-3.5 cursor-pointer" />
            </div>
            <div className="text-start text-neutral-100 text-xs font-normal font-['Inter']">{event.time}</div>
          </div>
        ))}
      </div>
    );
  };
  
  export default UpcomingEvent;
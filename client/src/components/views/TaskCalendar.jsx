import React, { useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TaskContext from '../../context/TaskContext';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TaskCalendar = ({ onEdit }) => {
  const { tasks } = useContext(TaskContext);

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => ({
      id: task._id,
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
      resource: task,
    }));

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad';
    if (event.resource.status === 'completed') backgroundColor = '#10b981';
    if (event.resource.status === 'todo') backgroundColor = '#f59e0b';
    if (event.resource.priority === 'high') backgroundColor = '#ef4444';

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  };

  return (
    <div className="glass-card p-6 rounded-xl h-full text-gray-900 bg-white/90">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 200px)' }}
        onSelectEvent={(event) => onEdit(event.resource)}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default TaskCalendar;

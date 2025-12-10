import React, { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskContext from '../../context/TaskContext';
import { FaEdit, FaTrash, FaClock } from 'react-icons/fa';

const columns = {
  'todo': { title: 'To Do', color: 'border-l-4 border-yellow-500' },
  'in-progress': { title: 'In Progress', color: 'border-l-4 border-blue-500' },
  'completed': { title: 'Completed', color: 'border-l-4 border-green-500' },
};

const TaskBoard = ({ onEdit }) => {
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    
    // If dropped in different column, update status
    if (destination.droppableId !== tasks.find(t => t._id === draggableId)?.status) {
         updateTask(draggableId, { status: destination.droppableId });
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-y-auto pb-10">
        {Object.entries(columns).map(([status, col]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-800/50 rounded-xl p-4 flex flex-col h-min min-h-[500px]"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-200 flex justify-between items-center">
                    {col.title}
                    <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">{getTasksByStatus(status).length}</span>
                </h3>
                <div className="space-y-3 flex-1">
                  {getTasksByStatus(status).map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow group ${col.color}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-semibold text-white">{task.title}</h4>
                             <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onEdit(task)} className="text-blue-400 hover:text-blue-300">
                                    <FaEdit />
                                </button>
                                <button onClick={() => deleteTask(task._id)} className="text-red-400 hover:text-red-300">
                                    <FaTrash />
                                </button>
                             </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                             <span className={`px-2 py-1 rounded bg-gray-800 uppercase font-bold 
                                ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                {task.priority}
                             </span>
                             {task.dueDate && (
                                 <span className="flex items-center space-x-1">
                                     <FaClock />
                                     <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                 </span>
                             )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;

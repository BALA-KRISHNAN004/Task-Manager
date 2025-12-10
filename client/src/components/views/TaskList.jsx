import React, { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import { FaEdit, FaTrash, FaCircle } from 'react-icons/fa';

const TaskList = ({ onEdit }) => {
  const { tasks, deleteTask, updateTask } = useContext(TaskContext);

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'text-yellow-500';
      case 'in-progress': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
       case 'high': return 'bg-red-500/20 text-red-500';
       case 'medium': return 'bg-yellow-500/20 text-yellow-500';
       case 'low': return 'bg-green-500/20 text-green-500';
       default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl overflow-hidden glass-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="bg-gray-700/50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {tasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{task.title}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-2 ${getStatusColor(task.status)} uppercase text-xs font-bold`}>
                    <FaCircle size={8} /> {task.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => onEdit(task)} className="text-blue-400 hover:text-white transition-colors">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteTask(task._id)} className="text-red-400 hover:text-white transition-colors">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
                <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No tasks found. Create one!
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;

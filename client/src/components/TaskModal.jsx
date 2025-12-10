import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const TaskModal = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (taskToEdit) {
        // Format date to YYYY-MM-DD for input type="date"
        const dateStr = taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '';
        setFormData({
            title: taskToEdit.title,
            description: taskToEdit.description,
            status: taskToEdit.status,
            priority: taskToEdit.priority,
            dueDate: dateStr
        });
    } else {
        setFormData({
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            dueDate: ''
        });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-6 rounded-2xl animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {taskToEdit ? 'Edit Task' : 'New Task'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Task Title"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Description..."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-1 text-sm">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full bg-black/40 border border-gray-600 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-transform transform hover:scale-[1.02] shadow-lg mt-4"
          >
            {taskToEdit ? 'Save Changes' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

import React, { useState, useContext, useEffect } from 'react';
import { TaskProvider } from '../context/TaskContext';
import TaskContext from '../context/TaskContext';
import Sidebar from '../components/Sidebar';
import TaskBoard from '../components/views/TaskBoard';
import TaskList from '../components/views/TaskList';
import TaskCalendar from '../components/views/TaskCalendar';
import TaskModal from '../components/TaskModal';
import { FaPlus, FaSearch } from 'react-icons/fa';

const DashboardContent = () => {
  const [view, setView] = useState('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { getTasks, addTask, updateTask, loading } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, []);

  const handleCreateTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    if (taskToEdit) {
      await updateTask(taskToEdit._id, formData);
    } else {
      await addTask(formData);
    }
    // Refresh is redundant if context updates state, but safe
  };

  if (loading) {
     return <div className="flex h-screen items-center justify-center text-white">Loading Tasks...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-900 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-fixed bg-cover">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 flex w-full">
        <Sidebar view={view} setView={setView} />

        <main className="flex-1 ml-64 p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {view === 'kanban' ? 'Board' : view === 'list' ? 'Tasks' : 'Calendar'}
              </h2>
              <p className="text-gray-400">Manage your projects and tasks</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateTask}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-5 py-2.5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <FaPlus />
                <span>New Task</span>
              </button>
            </div>
          </header>

          <div className="h-[calc(100vh-160px)]">
            {view === 'kanban' && <TaskBoard onEdit={handleEditTask} />}
            {view === 'list' && <TaskList onEdit={handleEditTask} />}
            {view === 'calendar' && <TaskCalendar onEdit={handleEditTask} />}
          </div>
        </main>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          taskToEdit={taskToEdit}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
    return (
        <TaskProvider>
            <DashboardContent />
        </TaskProvider>
    )
}

export default Dashboard;

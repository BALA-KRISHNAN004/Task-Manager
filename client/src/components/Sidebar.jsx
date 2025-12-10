import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FaTasks, FaList, FaCalendarAlt, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Sidebar = ({ view, setView }) => {
  const { logout, user } = useContext(AuthContext);

  const menuItems = [
    { id: 'kanban', label: 'Board', icon: <FaTasks /> },
    { id: 'list', label: 'List View', icon: <FaList /> },
    { id: 'calendar', label: 'Calendar', icon: <FaCalendarAlt /> },
  ];

  return (
    <div className="w-64 glass-card h-screen fixed left-0 top-0 flex flex-col border-r border-gray-800">
      <div className="p-6 flex items-center justify-center border-b border-gray-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          TaskFlow
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              view === item.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 bg-black/20">
        <div className="flex items-center space-x-3 mb-4">
           <FaUserCircle className="text-3xl text-gray-500" />
           <div className="overflow-hidden">
             <p className="text-sm font-medium text-white truncate">{user?.username || 'User'}</p>
             <p className="text-xs text-gray-400 truncate">{user?.email}</p>
           </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { createContext, useReducer, useEffect } from 'react';
import api from '../api/axios';

const TaskContext = createContext();

const initialState = {
  tasks: [],
  loading: true,
  error: null,
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks], loading: false };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        loading: false,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        loading: false,
      };
    case 'TASK_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get Tasks
  const getTasks = async () => {
    try {
      const res = await api.get('/tasks');
      dispatch({ type: 'GET_TASKS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TASK_ERROR', payload: err.response?.data?.msg || 'Error fetching tasks' });
    }
  };

  // Add Task
  const addTask = async (formData) => {
    try {
      const res = await api.post('/tasks', formData);
      dispatch({ type: 'ADD_TASK', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TASK_ERROR', payload: err.response?.data?.msg || 'Error adding task' });
    }
  };

  // Update Task
  const updateTask = async (id, formData) => {
    try {
      const res = await api.put(`/tasks/${id}`, formData);
      dispatch({ type: 'UPDATE_TASK', payload: res.data });
    } catch (err) {
      dispatch({ type: 'TASK_ERROR', payload: err.response?.data?.msg || 'Error updating task' });
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (err) {
      dispatch({ type: 'TASK_ERROR', payload: err.response?.data?.msg || 'Error deleting task' });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loading: state.loading,
        error: state.error,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;

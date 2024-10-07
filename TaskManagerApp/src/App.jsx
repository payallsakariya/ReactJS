import React, { createContext, useReducer, useContext } from 'react';

// Task actions
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

// Initial state
const initialState = {
  tasks: [],
};

// Reducer function
const taskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id),
      };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext();

// Context provider component
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Context value
  const value = { state, dispatch };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use TaskContext
export const useTaskContext = () => {
  return useContext(TaskContext);
};

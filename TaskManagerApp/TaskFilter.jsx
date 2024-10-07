import React, { useContext, useState, useMemo } from 'react';
import { TaskContext } from './TaskProvider';

const TaskFilter = () => {
  const { tasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'uncompleted':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [filter, tasks]);

  return (
    <div>
      <h3>Filter Tasks</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFilter;

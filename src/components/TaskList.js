import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask } from '../services/api';
import NewTaskForm from './NewTaskForm';
import SearchBar from './SearchBar';
import EditTaskForm from './EditTaskForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Import from the new library

import './TaskList.css';

const TaskList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const tasksPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data.message);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      await createTask(newTask);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateTask(updatedTask.id, updatedTask);
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleSort = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedItem] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, reorderedItem);

    setTasks(updatedTasks);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const searchTermLower = typeof searchQuery === 'string' ? searchQuery.toLowerCase() : '';

  const filteredTasks = tasks.filter((task) => {
    const nameLower = task.name.toLowerCase();
    const textLower = task.text.toLowerCase();

    return nameLower.includes(searchTermLower) || textLower.includes(searchTermLower);
  });

  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = Math.min(startIndex + tasksPerPage, filteredTasks.length);
  const tasksToShow = filteredTasks.slice(startIndex, endIndex);

  return (
    <div className="task-list-container">
      <h2>Tasks</h2>
      <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={handleSort}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {tasksToShow.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <tr
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.text}</td>
                        <td>{task.status}</td>
                        <td>{task.due_date}</td>
                        <td>{task.creation_date}</td>
                        <td>
                          <button onClick={() => handleEditTask(task)}>Edit</button>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= filteredTasks.length}>
          Next Page
        </button>
      </div>

      {editTask && <EditTaskForm task={editTask} updateTask={handleUpdateTask} />}
      <NewTaskForm addTask={handleAddTask} />
    </div>
  );
};

export default TaskList;

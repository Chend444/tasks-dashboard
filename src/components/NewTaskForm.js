import React, { useState } from 'react';
import './NewTaskForm.css'; // Import the CSS file for styling

const NewTaskForm = ({ addTask }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [due_date, setDueDate] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new task object with the form data
    const newTask = {
      name,
      text,
      status,
      due_date,
    };
    // Pass the new task data to the addTask function from the parent component
    addTask(newTask);
    // Clear the form fields after submitting
    setName('');
    setText('');
    setDueDate('');
    setStatus('');
  };

  return (
    <div className="new-task-form">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewTaskForm;

// EditTaskForm.js
import React, { useState } from 'react';
import './EditTaskForm.css'; // Import the CSS file for styling

const EditTaskForm = ({ task, updateTask, closeForm }) => {
  const [name, setName] = useState(task.name);
  const [text, setText] = useState(task.text);
  const [due_date, setDueDate] = useState(task.due_date);
  const [status, setStatus] = useState(task.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      id: task.id,
      name,
      text,
      due_date,
      status,
    };
    updateTask(updatedTask);
  };

  const handleClose = () => {
    closeForm(); // Call the function to close the form
  };

  return (
    <div className="edit-task-form">
      <h2>Edit Task</h2>
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
        <button type="submit">Update Task</button>
        <button type="button" onClick={handleClose}>Close</button> {/* Close button */}
      </form>
    </div>
  );
};

export default EditTaskForm;

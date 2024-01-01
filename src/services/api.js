import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Update the due date format to 'YYYY-MM-DD'
//const formatDate = (dateString) => {
//  const date = new Date(dateString);
//  const year = date.getFullYear();
//  const month = String(date.getMonth() + 1).padStart(2, '0');
//  const day = String(date.getDate()).padStart(2, '0');
//  return `${year}-${month}-${day}`;
//};

export const getTasks = () => {
  return axiosInstance.get('/tasks');
};

export const createTask = async (newTask) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateTask = (taskId, updatedTaskData) => {
  return axiosInstance.put(`/tasks/${taskId}`, updatedTaskData);
};

export const deleteTask = (taskId) => {
  return axiosInstance.delete(`/tasks/${taskId}`);
};

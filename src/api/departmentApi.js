import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Create a new department
export const createDepartment = async (department) => {
  try {
    const response = await axios.post(`${BASE_URL}/departments`, department);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get department by ID
export const getDepartment = async (departmentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all departments
export const getAllDepartments = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/departments`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update department by ID
export const updateDepartment = async (departmentId, department) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/departments/${departmentId}`,
      department
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete department by ID
export const deleteDepartment = async (departmentId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/departments/${departmentId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getManagers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/managers`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

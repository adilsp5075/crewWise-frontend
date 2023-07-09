import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your actual server URL

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${BASE_URL}/employees`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getEmployee = async (employeeId) => {
  try {
    const response = await axios.get(`${BASE_URL}/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/employees`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(`${BASE_URL}/employees/${employeeId}`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/employees/${employeeId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const promoteEmployee = async (employeeId) => {
  try {
    const response = await axios.put(`${BASE_URL}/employees/${employeeId}/promote`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail);
  }
};
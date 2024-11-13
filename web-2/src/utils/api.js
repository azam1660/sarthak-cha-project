import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust based on your backend URL

export const registerDriver = (data) =>
  axios.post(`${API_URL}/auth/register`, data);
export const loginDriver = (data) => axios.post(`${API_URL}/auth/login`, data);
export const addStop = (busCode, stopData) =>
  axios.post(`${API_URL}/buses/${busCode}/stops`, stopData);
export const removeStop = (busCode, stopId) =>
  axios.delete(`${API_URL}/buses/${busCode}/stops/${stopId}`);
export const getAnalytics = (busCode) =>
  axios.get(`${API_URL}/analytics/${busCode}`);



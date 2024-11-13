import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerStudent = (data) =>
  axios.post(`${API_URL}/auth/register`, data);
export const loginStudent = (data) => axios.post(`${API_URL}/auth/login`, data);
export const searchNearbyBuses = (locationData) =>
  axios.post(`${API_URL}/buses/nearby`, locationData);
// export const getBusDetails = (busCode) => axios.get(`${API_URL}/buses/${busCode}`);
export const getNotifications = () => axios.get(`${API_URL}/notifications`);

// utils/api.js
export const getBusDetails = async (busCode) => {
  // Mocked response; replace this with your actual API call
  return {
    data: {
      bus: {
        busCode: busCode,
        route: "Downtown - Uptown",
        timing: "08:00 AM - 08:00 PM",
        performanceStats: {
          onTimePercentage: 87,
          usageCount: 120,
        },
        location: { coordinates: [40.7128, -74.006] },
        stops: [
          {
            _id: "1",
            stopName: "Main St",
            latitude: 40.7128,
            longitude: -74.0059,
            arrivalTimeEstimate: "10:15 AM",
          },
          {
            _id: "2",
            stopName: "Broadway",
            latitude: 40.7138,
            longitude: -74.007,
            arrivalTimeEstimate: "10:30 AM",
          },
          // Add more stops as needed
        ],
      },
    },
  };
};

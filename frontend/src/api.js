import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getQueues = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/allQueues`);
    return response.data;
  } catch (error) {
    console.error("Error fetching queues:", error);
    throw error;
  }
};

export const getNextMessage = async (queueName, timeout) => {
  try {
    const url = timeout
      ? `${API_BASE_URL}/queue/${queueName}?timeout=${timeout}`
      : `${API_BASE_URL}/queue/${queueName}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching message:", error);
    throw error;
  }
};

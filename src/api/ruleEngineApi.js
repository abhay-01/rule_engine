import axios from "axios";

// Base URL for your backend (adjust if necessary)
const API_BASE_URL = "http://localhost:5000/api";

export const createRule = async (ruleString) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rules`, { ruleString });
    console.log("FRONTEND KA CREATE RULE", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating rule:", error);
    throw error;
  }
};

export const combineRules = async (requestBody) => {
  console.log("requestBody", requestBody);

  try {
    const response = await axios.post(`${API_BASE_URL}/combine`, requestBody);
    return response.data;
  } catch (error) {
    console.error("Error combining rules:", error);
    throw error;
  }
};

export const evaluateRule = async (userData,ruleAst) => {
  try {
    console.log("ruleAst", ruleAst);
    console.log("userData", userData);
    const response = await axios.post(`${API_BASE_URL}/evaluate`, {
      userData,
      ruleAst,
    });

    console.log("RESPONSE--->>", response.data);
    return response.data;
  } catch (error) {
    console.error("Error evaluating rule:", error);
    throw error;
  }
};

export const getRules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rules`);
    return response.data; // Array of rules
  } catch (error) {
    console.error("Error getting rules:", error);
    throw error;
  }
};

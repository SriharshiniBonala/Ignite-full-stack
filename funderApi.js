import axios from "axios";

const BASE_URL = "http://localhost:8080/api/funders";

export const registerFunder = (data) => axios.post(`${BASE_URL}/register`, data);
export const loginFunder = (data) => axios.post(`${BASE_URL}/login`, data);
export const getAllFunders = () => axios.get(BASE_URL);

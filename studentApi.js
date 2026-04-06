import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL + '/students';

export  const registerStudent = (data) => axios.post(`${BASE_URL}/register`, data);
export const loginStudent = (data) => axios.post(`${BASE_URL}/login`, data);
export const getStudentProfile = (id) => axios.get(`${BASE_URL}/${id}`);
export const addProject = (data) => axios.post(`${BASE_URL}/project`, data);
export const getStudentProjects = (id) => axios.get(`${BASE_URL}/projects/${id}`);
export const updateStudentProfile = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
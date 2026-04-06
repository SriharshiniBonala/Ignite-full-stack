import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL + '/mentors';

export const registerMentor = (data) => axios.post(`${BASE_URL}/register`, data);
export const loginMentor = (data) => axios.post(`${BASE_URL}/login`, data);
export const searchMentors = (domain) => axios.get(`${BASE_URL}/search/${domain}`);
export const getMentorProfile = (id) => axios.get(`${BASE_URL}/${id}`);
export const allMentors = () => axios.get(`${BASE_URL}`);
export const updateMentorProfile = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

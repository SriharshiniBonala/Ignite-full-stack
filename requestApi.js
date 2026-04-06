import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL + '/requests';

export const sendRequest = (data) => axios.post(BASE_URL, data);
export const acceptRequest = (id) => axios.put(`${BASE_URL}/accept/${id}`);
export const rejectRequest = (id) => axios.put(`${BASE_URL}/reject/${id}`);
export const getMentorRequests = (mentorId) => axios.get(`${BASE_URL}/mentor/${mentorId}`);
export const getStudentRequests = (studentId) => axios.get(`${BASE_URL}/student/${studentId}`);
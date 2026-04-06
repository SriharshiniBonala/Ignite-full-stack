import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL + '/ratings';

export const addRating = (data) => axios.post(BASE_URL, data);
export const getRatings = (mentorId) => axios.get(`${BASE_URL}/${mentorId}`);
export const getAverageRating = (mentorId) => axios.get(`${BASE_URL}/average/${mentorId}`);
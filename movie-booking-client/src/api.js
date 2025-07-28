import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = (email, password) =>
  axios.post(`${API_URL}/login`, { Email: email, Password: password });

export const register = (fullName, email, password) =>
  axios.post(`${API_URL}/users`, {
    FullName: fullName,
    Email: email,
    PasswordHash: password
  });

export function getMovies() {
  return axios.get(`${API_URL}/movies`);
}

export const addMovie = (movie, token) =>
  axios.post(`${API_URL}/movies`, movie, { headers: { Authorization: `Bearer ${token}` } });

export const getShowtimes = () =>
  axios.get(`${API_URL}/showtimes`);

export const bookTickets = (booking, token) =>
  axios.post(`${API_URL}/bookings`, booking, { headers: { Authorization: `Bearer ${token}` } });

export const addShowtime = (showtimeData) =>
  axios.post(`${API_URL}/showtimes`, showtimeData);

export const getRooms = () => axios.get(`${API_URL}/rooms`);

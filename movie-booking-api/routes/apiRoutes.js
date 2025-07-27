const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const movieController = require('../controllers/movieController');
const showtime = require('../controllers/showtimeController');
const user = require('../controllers/userController');
const booking = require('../controllers/bookingController');
const seat = require('../controllers/seatController');


// Login
router.post('/login', authController.login);

// Movies
router.get('/movies', movieController.getAllMovies);
router.get('/movies/:id', movieController.getMovieById);
router.post('/movies', movieController.createMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

// Showtimes
router.get('/showtimes', showtime.getShowtimes);
router.get('/showtimes/:id', showtime.getShowtimeById);
router.post('/showtimes', showtime.createShowtime);
router.put('/showtimes/:id', showtime.updateShowtime);
router.delete('/showtimes/:id', showtime.deleteShowtime);

// Users
router.get('/users', user.getUsers);
router.get('/users/:id', user.getUserById);
router.post('/users', user.createUser);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

// Bookings
router.get('/bookings', booking.getBookings);
router.get('/bookings/:id', booking.getBookingById);
router.post('/bookings', booking.createBooking);
router.get('/bookings/user/:id', booking.getBookingsByUserId);
router.put('/bookings/:id', booking.updateBooking);
router.delete('/bookings/:id', booking.deleteBooking);

// Seats
router.get('/seats', seat.getSeats);
router.get('/seats/:id', seat.getSeatById);
router.post('/seats', seat.createSeat);
router.put('/seats/:id', seat.updateSeat);
router.delete('/seats/:id', seat.deleteSeat);
router.get('/booked-seats/:showtimeId', seat.getBookedSeatsByShowtime);

// ✅ Đặt ở cuối cùng
module.exports = router;
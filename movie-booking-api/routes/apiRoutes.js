const express = require('express');
const router = express.Router();

const user = require('../controllers/userController');

// Users
router.get('/users', user.getUsers);
router.get('/users/:id', user.getUserById);
router.post('/users', user.createUser);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

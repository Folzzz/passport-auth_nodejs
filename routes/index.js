const express = require('express');

const router = express.Router();

// authentication config
const { ensureAuthenticated } = require('../config/auth');

// Index Page
router.get('/', (req, res) => {
    res.render('welcome');
})

// Dashboard Page
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
})


module.exports = router;

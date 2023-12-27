const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controller/controller'); 

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../login/login.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/../login/register.html'));
});

router.get('/index', (req, res) => {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname + '/../index.html'));
    } else {
        const errorMessage = 'You most login to see this page';
        res.send(`<script>alert('${errorMessage}'); window.location.href='/';</script>`);
    }
});

router.post('/auth', authController.authenticate);
router.post('/authreg', authController.register);
router.post('/logout', authController.logout);

module.exports = router;

const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated')

router.get('/', isAuthenticated, function (req, res, next) {
    res.render('index', {
        title: 'EasyJur, seu facilitador laboral.',
        isAuthenticated: req.session.isAuthenticated,
        username: req.session.account?.username,
        request: req
    });
});

module.exports = router;

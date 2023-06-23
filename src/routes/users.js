const express = require('express');
const router = express.Router();

const fetch = require('../utils/fetch.js');
const isAuthenticated = require('../middleware/isAuthenticated.js')

const { GRAPH_ME_ENDPOINT } = require('../config/authConfig');

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        res.render('id', { idTokenClaims: req.session.account.idTokenClaims });
    }
);

router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(GRAPH_ME_ENDPOINT, req.session.accessToken);
            res.render('pages/profile', { profile: graphResponse });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;

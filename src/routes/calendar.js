const express = require('express');
const router = express.Router();

const { Client } = require('@microsoft/microsoft-graph-client')
require('isomorphic-fetch');

// const authProvider = require('../config/authConfig')
const authProvider = {
    getAccessToken: async () => {
        // Call getToken in auth.js
        return await getToken();
    }
};


const fetch = require('../utils/fetch.js');
const isAuthenticated = require('../middleware/isAuthenticated.js')

const GRAPH_API_ENTPOINT = process.env.GRAPH_API_ENDPOINT


router.get('/',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            const graphResponse = await fetch(GRAPH_API_ENTPOINT + '/me/calendars', req.session.accessToken);
            res.render('pages/calendar', { calendars: graphResponse, events: [], request: req });
        } catch (error) {
            next(error);
        }
    }
);

router.get('/list', 
    isAuthenticated,
    async function(req, res, next) {
        try {
            // const url = GRAPH_API_ENTPOINT + '/groups/' + req.session.account.localAccountId + '/events'
            const url = GRAPH_API_ENTPOINT + '/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location'

            const events = await fetch(url, req.session.accessToken)

            res.render('pages/calendar', { events, calendars: null, request: req })

        } catch (error) {
            next(error)            
        }
    }
)

router.get('/create',
    isAuthenticated,
    async function(req, res) {
        res.render('pages/event', { request: req })
    }
)

module.exports = router;

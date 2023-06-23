// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/login'); // redirect to sign-in route
    }

    next();
};

module.exports = isAuthenticated

// authMiddleware.js
const authenticateUser = (req, res, next) => {
    if (req.session.loggedin) {
        req.username = req.session.username;
        next();
    } else {
        res.redirect('/');
    }
};

module.exports = { authenticateUser };

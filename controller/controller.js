const db = require('../config/database');
exports.authenticate = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/index');
        } else {
            const errorMessage = 'Incorrect Username or Password';
            res.status(401).send(errorMessage);
            console.log(errorMessage);
        }
    } catch (error) {
        console.error(error);
    }
};


exports.register = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        try {
            await db.query('INSERT INTO users(username, password) VALUES (?, ?)', [username, password]);
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        const errorMessage = 'Please Enter Username and Password';
        res.status(400).send(errorMessage);
    }
};


exports.logout = (req, res) => {
    if (req.session.loggedin) {
        // Clear the session data indicating the user is logged in
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.redirect('/');
        });
    } else {
        const errorMessage = 'You must be logged in to log out.';
        res.status(401).send(errorMessage);
    }
};

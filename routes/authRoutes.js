const passport = require('passport');
var fs = require('fs');
module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', {

        scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/dashboard');
        }
    );
    app.get('/api/logout', (req, res) => {

        req.logout();
        res.redirect('/')
    });

    app.get('/api/current_user', (req, res) => {

        res.send(req.user);
    });
    app.get('/utkarsh_resume', (req, res) => {
        res.sendFile(__dirname + "/pdf/UtkarshResume.pdf");

    });

};


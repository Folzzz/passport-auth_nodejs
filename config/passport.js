const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        return done(null, false, { message: 'Email does not exist'});
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        console.log('compare password');
                        if (err) done(err);

                        if (isMatch) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, { message: 'Incorrect Password' });
                        }
                    });
                })
                .catch(err => console.log(err))
        })
    );

    // serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

}
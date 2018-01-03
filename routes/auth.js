'use strict';

import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import uuid from 'uuid/v4';
const GoogleStrategy = passportGoogle.Strategy;
const LocalStrategy = passportLocal.Strategy;
const router = express.Router();

export default (knex) => {

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_CALLBACK,
        accessType: 'offline'
    }, (accessToken, refreshToken, params, profile, cb) => {
    
        knex.raw(`
            INSERT INTO users(user_id, user_password, user_first_name, user_last_name, user_email, user_picture, user_type) 
            VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT (user_id) DO UPDATE SET user_picture = ? RETURNING *;
        `, [
            profile.id,
            uuid(),
            profile.name.givenName,
            profile.name.familyName,
            profile.emails[0].value,
            profile.photos[0].value,
            'pending',
            profile.photos[0].value,
        ]).then(result => {
            let user = result.rows[0];
            delete user.user_password;
            delete user.user_deleted_at;
            cb(null, user);
        });
    }));

    // user local strategy
    passport.use(new LocalStrategy(
        (username, password, done) => {
            console.log(username);
            knex('users').select().where('user_email', username).first().then(user => {
                if (user == null) {
                    done(null, false);
                    return;
                }
                if (bcrypt.compareSync(password, user.user_password))  {
                    delete user.user_password;
                    delete user.user_deleted_at;
                    done(null, user);
                    return;
                }
                done(null, false);
            }).catch(err => {
                done(err);
            });
        }
    ));

    passport.serializeUser((user, cb) => { 
        cb(null, user);
    });
    passport.deserializeUser((obj, cb) => { 
        cb(null, obj);
    });

    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) { 
                return next(err); 
            }
            if (!user) {
                res.status(403).send('invalid username and/or password');
                return;
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                const redirect = req.session.oauth2return || '/';
                delete req.session.oauth2return;
                res.redirect(redirect);
            });
        })(req, res, next);
    });

    router.get('/login', (req, res, next) => {
        if (req.query.return) {
            req.session.oauth2return = req.query.return;
        }
        next()
    }, passport.authenticate('google', { scope: ['email', 'profile'] }));
    
    router.get('/google/callback', passport.authenticate('google'), (req, res) => {
        const redirect = req.session.oauth2return || '/';
        delete req.session.oauth2return;
        res.redirect(redirect);
    });
    
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
}

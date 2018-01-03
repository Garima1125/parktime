'use strict';

import path from 'path';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import knex from 'knex';
import uuid from 'uuid/v4';
import knexConfig from './knexfile';

import mw from './middlewares';

import authRoutes from './routes/auth';
import dogsRoutes from './routes/dogs';
import usersRoutes from './routes/users'
import walkersRoutes from './routes/walkers'
import ownersRoutes from './routes/owners'

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const app = express();
const knexObj = knex(knexConfig[ENV]);
const sessionConfig = {
    secret: uuid(),
    resave: false,
    saveUninitialized: false,
    signed: true
};

app.use(session(sessionConfig));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes(knexObj));
app.use('/users', usersRoutes(knexObj));

app.get('/test', mw.auth, mw.authType(null), (req, res) => {
    res.json(req.user);
});

app.get('/', (req, res) => {
    res.render('main');
});

// full login page
app.get('/login', (req, res) => {
    if (req.user) {
        res.redirect('/');
        return;
    }
    res.render('main');
});

// update profile page
app.get('/profile', mw.auth, (req, res) => {
    res.render('main');
});

app.get('/dogs', (req, res) => {
  res.render('main');
});

app.get('/about', (req, res) => {
    res.render('main');
});

app.get('/walker', (req, res) => {
    res.render('main');
});

app.get('/owner', (req, res) => {
    res.render('main');
});

app.get('/search/jobs', (req, res) => {
  res.render('main');
});

app.get('/search/walkers', (req, res) => {
    res.render('main');
});

app.get('/myjobs', (req, res) => {
    res.render('main');
});

app.get('/jobs', (req, res) => {

    // associated dog - associated owner - associated user detail
    knexObj.raw(`select * from users 
    left join users_detail on users.user_id = users_detail.user_detail_user_id and user_detail_deleted_at is null
    left join owners on users.user_id = owners.owner_user_id and owner_deleted_at is null
    left join dogs on dogs.dog_owner_id = owners.owner_id and dog_deleted_at is null 
    left join jobs on dogs.dog_id = jobs.job_dog_id and job_deleted_at is null 
    `).then(result => {
        res.json(result.rows);
    }).catch(err => {
        res.status(500).send(err);
    });
})

app.get('/walker/profile/view', (req, res) => {
  res.render('main');
});

app.get('/dogs/new', (req, res) => {
  res.render('main');
});

app.use('/dogs', dogsRoutes(knexObj));

app.use('/walkers', walkersRoutes(knexObj));
app.use('/owners', ownersRoutes(knexObj));

app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);
})

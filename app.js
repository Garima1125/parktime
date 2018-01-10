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
import usersRoutes from './routes/users';
import walkersRoutes from './routes/walkers';
import ownersRoutes from './routes/owners';
import reviewsRoutes from './routes/reviews';

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
app.use(bodyParser.urlencoded({limit: '250mb', extended: true }));
app.use(bodyParser.json({limit: '250mb'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes(knexObj));
app.use('/users', usersRoutes(knexObj));
app.use('/dogs', dogsRoutes(knexObj));
app.use('/reviews', reviewsRoutes(knexObj));

// test route to demonstrate user auth and routing middleware
app.get('/test',
    mw.auth,
    mw.authType(null), (req, res) => {
    res.json(req.user);
});
app.get('/owneronly', mw.auth, mw.authType('owner'), (req, res) => {
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

app.get('/profile/view', (req, res) => {
  res.render('main');
});



app.get('/about', (req, res) => {
    res.render('main');
});

app.get('/search/jobs', (req, res) => {
  res.render('main');
});

app.get('/myjobs', (req, res) => {
    res.render('main');
});

app.get('/myjobsowner', (req, res) => {
    res.render('main');
});

// get all jobs
app.get('/jobs', (req, res) => {
    knexObj.raw(`select * from users
    right join dogs on dogs.owner_id = users.user_id and user_deleted_at is null
    right join jobs on jobs.job_dog_id = dogs.dog_id and job_deleted_at is null
    `)
    .then(result => {
        let users = {};
        for (let row of result.rows) {
            if (row.user_id in users){
                if (row.job_id !== null) {
                    users[row.user_id].jobs.push({
                        job_id: row.job_id,
                        job_title: row.job_title,
                        job_description: row.job_description,
                        job_rate: row.job_rate,
                        job_status: row.job_status
                    });
                }
            }else{
                let user = {
                    user_id: row.user_id,
                    user_first_name: row.user_first_name,
                    user_last_name: row.user_last_name,
                    user_email: row.user_email,
                    user_type: row.user_type,
                    user_postal_code: row.user_postal_code,
                    user_latitude: row.user_latitude,
                    user_longitude: row.user_longitude,
                    user_phone: row.user_phone,
                    user_picture: row.user_picture,
                }
                if (row.job_id != null) {
                    user.jobs = [{
                        job_id: row.job_id,
                        job_title: row.job_title,
                        job_description: row.job_description,
                        job_rate: row.job_rate,
                        job_status: row.job_status
                    }]
                } else {
                    user.jobs = [];
                }
                users[row.user_id] = user;
            }
        }
        res.json(Object.values(users));
    }).catch(err => {
        res.status(500).send(err);
    });
})

app.get(
    '/appliedjobs',
    mw.auth,
    mw.authType('walker'),
    (req, res) => {
        knexObj.raw(`select * from jobs
        left outer join applications
        on applications.application_job_id = jobs.job_id where applications.applicant_id = ?`, [req.user.user_id]).then(result => {
            res.json(result.rows);
        }).catch(err => {
            res.status(500).json(err);
        });
})

app.get(
    '/jobsforreview',
    mw.auth,
    mw.authType('owner'),
    (req, res) => {
        knexObj.raw(`
          SELECT
              jobs.job_id,
              CONCAT(walkers.user_first_name, ' ' ,walkers.user_last_name) AS walker_name,
              jobs.job_title,
              dogs.dog_name,
              jobs.job_created_at,
              jobs.walker_id
          FROM users AS owners
          LEFT JOIN dogs ON (dogs.owner_id = owners.user_id AND dog_deleted_at IS NULL)
          LEFT JOIN jobs ON (jobs.job_dog_id = dogs.dog_id)
          LEFT JOIN users AS walkers ON (jobs.walker_id = walkers.user_id)
          WHERE owners.user_id = ? AND job_status = 'completed'`, [req.user.user_id]).then(result => {
            res.json(result.rows);
        }).catch(err => {
            res.status(500).json(err);
        });
})
app.put(
    '/completejob',
    mw.auth,
    mw.authType('walker'),
    (req, res) => {
        console.log(req.body.job_id);
        knexObj('jobs')
            .update('job_status', 'completed')
            .where('job_id', req.body.job_id)
            .returning('*')
            .then(result => {
                console.log(result)
                res.json(result.rows);
            }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
)

app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);
})

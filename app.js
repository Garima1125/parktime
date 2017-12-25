"use strict";

import path from 'path';
import express from 'express';
import knex from 'knex';
import knexConfig from './knexfile';
import dogsRoutes from './routes/dogs';
import usersRoutes from './routes/users'
import walkersRoutes from './routes/walkers'
import ownersRoutes from './routes/owners'

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const app = express();
const bcrypt = require('bcrypt');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');

// knex is function
console.log(knexConfig[ENV]);
const knexObj = knex(knexConfig[ENV]);

//---routes---------------------------
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('main');
});

app.get('/dogs', (req, res) => {
  res.render('main');
});

app.get('/about', (req, res) => {
    res.render('main');
});

app.get('/profile', (req, res) => {
    res.render('main');
});

app.get('/walker', (req, res) => {
    res.render('main');
});

app.get('/owner', (req, res) => {
    res.render('main');
});

app.get('/search', (req, res) => {
  res.render('main');
});

app.use('/dogs', dogsRoutes(knexObj));
app.use('/users', usersRoutes(knexObj));
app.use('/walkers', walkersRoutes(knexObj));
app.use('/owners', ownersRoutes(knexObj));


app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);
})

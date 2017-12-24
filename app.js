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

app.post('/users/auth/google', (req, res) => {

  var email = req.body.email;
  var firstName = req.body.givenName;
  var lastName = req.body.familyName;
  var password = req.body.googleId;
  var photo_url = req.body.imageUrl;

  knexObj
      .select("user_id")
      .from("users")
      .where("email", email)
      .then(function(results) {
          if(results.length === 0) {
            knexObj
            .insert({email: email, password: password, first_name: firstName, last_name: lastName})
            .into('users')
            .then(function() {
              res.send({authenticated: true});
            })
          }
          else {
            res.send({authenticated: true});
          }
      });
});


app.post('/users/auth/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  knexObj
      .select("user_id","password")
      .from("users")
      .where("email", email)
      .then(function(results) {
          console.log('results ', results)
          if(results.length === 0) {
            knexObj
            .insert({email: email, password: bcrypt.hashSync(req.body.password, 5)})
            .into('users')
            .returning('*')
            .then(function() {
              res.send({authenticated: true});
            })
          }
          else {
            bcrypt.compare(password, results[0].password, function(err, result) {
              console.log("result", result);
              if(result) {
                res.send({authenticated: true});
              } else {
                res.status(403);
              }
            });
          }
        });

});

app.post('/users/profile/create', (req, res) => {
  console.log(req.body);
  res.send(200);
});


app.use('/dogs', dogsRoutes(knexObj));
app.use('/users', usersRoutes(knexObj));
app.use('/walkers', walkersRoutes(knexObj));
app.use('/owners', ownersRoutes(knexObj));


app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);
})

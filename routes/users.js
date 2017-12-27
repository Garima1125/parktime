"use strict"

import express from 'express';
import reviewsRoutes from './reviews';
const router = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

export default (knex) => {
    router.use('/:user_id/reviews', reviewsRoutes(knex));

    router.get('/', (req, res) => {
        knex
            .select('*')
            .from('users')
            .then(result => {
                res.status(200).send(result);
            }, err => {
                res.status(500).send('Error');
            });
    });

    router.post('/users/create/', (req, res) => {
      console.log(req.body);
      res.status(200).send();
    });

    // router.post('/:user_id', (req, res) => {
    //     console.log("view a user");
    //     res.status(200).send("");
    // })

    router.get('/:user_id', (req, res) => {
        users.where("user_id", req.params.id).fetch()
        .then (result => {
            res.status(200).send(result);
        }, err => {
            res.status(500),send("Error");
        });
    });

    router.put('/:user_id', (req, res) => {
        console.log("update user profile");
        res.status(200).send("");
    })
    router.delete('/:user_id', (req, res) => {
        console.log("delete user");
        res.status(200).send("");
    })

    router.post('/auth/google', (req, res) => {
        console.log(req.body);
        let user = {
            user_password: '',
            user_first_name: req.body.givenName,
            user_last_name: req.body.familyName,
            user_email: req.body.email,
            user_id: req.body.googleId
        };

        knex
            .select("user_id")
            .from("users")
            .where("user_email", user.user_email)
            .then(function(results) {
                if(results.length === 0) {
                knex
                  .insert(user)
                  .into('users')
                  .then(function() {
                    res.send({"authenticated": "true"});
                  })
                }
                else {
                  res.send({"authenticated": "true"});
                }
            });
    });


    router.post('/auth/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        // let user = {
        //     user_id: '',
        //     email: req.body.email,
        //     password: bcrypt.hashSync(req.body.password, 5)
        // }

        knex
            .select("user_id","user_password")
            .from("users")
            .where("user_email", req.body.email)
            .then(function(results) {
                console.log('results ', results)
                if(results.length === 0) {
                knex
                  .insert({
                      user_id: uuidv4(),
                      user_email: req.body.email,
                      user_password: bcrypt.hashSync(req.body.password, 5)
                  })
                  .into('users')
                  .returning('*')
                  .then(function() {
                    res.send({authenticated: true});
                  })
                }
                else {
                  bcrypt.compare(password, results[0].user_password, function(err, result) {
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

    router.post('/profile/create', (req, res) => {
        console.log(req.body);
        res.send(200);
    });

    return router;
}

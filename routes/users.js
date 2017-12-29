"use strict"

import express from 'express';
import reviewsRoutes from './reviews';
const router = express.Router({mergeParams: true});


export default (knex) => {
    router.use('/:user_id/reviews', reviewsRoutes(knex));

    router.get('/', (req, res) => {
        knex('users')
            .select('*')
            .then(result => {
                res.status(200).send(result);
            }, err => {
                res.status(500).send('Error');
            });
    });

    router.get('/walkers', (req, res) => {
        knex
        .select()
        .from('users')
        .fullOuterJoin('users_detail', 'users.user_id', 'users_detail.user_id')
        .fullOuterJoin('walkers', 'users_detail.user_id', 'walkers.walker_user_id')
        .where('user_city', 'toronto')
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).send(err);
        })
    })

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
        
        let user = { 
            password: '',
            first_name: req.body.givenName,
            last_name: req.body.familyName,
            email: req.body.email,
            user_id: req.body.googleId // uuid
        };

        knex
            .select("user_id")
            .from("users")
            .where("email", user.email)
            .then(function(results) {
                if(results.length === 0) {
                knex
                  .insert(user)
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
      
      
    router.post('/auth/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        let user = {
            user_id: '',
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 5)
        }
      
        knex
            .select("user_id","password")
            .from("users")
            .where("email", email)
            .then(function(results) {
                console.log('results ', results)
                if(results.length === 0) {
                knex
                  .insert(user)
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
      
    router.post('/profile/create', (req, res) => {
        console.log(req.body);
        res.send(200);
    });
    
    return router;
}

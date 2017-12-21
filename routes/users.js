"use strict"

import express from 'express';
import reviewsRoutes from './reviews';
const router = express.Router({mergeParams: true});

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
    return router;
}

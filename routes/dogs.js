"use strict"

import express from 'express';
import jobsRoutes from './jobs';
const router = express.Router({mergeParams: true});

export default (knex) => {
    // console.log(jobsRoutes(knex));
    router.use('/:dog_id/jobs', jobsRoutes(knex));

    router.post('/', (req, res) => {
        console.log("create new dog");
        res.status(200).send("");
    })

    router.get ('/all', (req, res) => {
        // TODO: get from session
        let user_id = '1';
        let dogs = knex('dogs').select('*').where('owner_id', user_id);
        dogs.then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    router.get('/:dog_id', (req, res) => {
        console.log("view a dog");
        res.status(200).send("");
    })
    router.put('/:dog_id', (req, res) => {
        console.log("update dog profile");
        res.status(200).send("");
    })
    router.delete('/:dog_id', (req, res) => {
        console.log("delete dog");
        res.status(200).send("");
    })
    return router;
}
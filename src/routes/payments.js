"use strict"

import express from 'express';
const router = express.Router({mergeParams: true});

export default (knex) => {

    router.get('/:payment_id', (req, res) => {
        console.log("review a payment");
        res.status(200).send("");
    })

    router.post('/', (req, res) => {
        console.log("make a payment");
        res.status(200).send("");
    })

    return router;
}
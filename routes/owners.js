"use strict"

import express from 'express';
const router = express.Router({mergeParams: true});

export default (knex) => {
    router.get('/', (req, res) => {
        console.log("view owners");
        res.status(200).send("");
    })
    router.post('/:owner_id', (req, res) => {
        console.log("create new owner");
        res.status(200).send("");
    })

    router.get('/:owner_id', (req, res) => {
        console.log("view a owner");
        res.status(200).send("");
    })
    router.put('/:owner_id', (req, res) => {
        console.log("update owner profile");
        res.status(200).send("");
    })
    router.delete('/:owner_id', (req, res) => {
        console.log("delete owner");
        res.status(200).send("");
    })
    return router;
}
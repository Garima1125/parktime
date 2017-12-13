"use strict"

import express from 'express';
const router = express.Router({mergeParams: true});

export default (knex) => {
    router.get('/', (req, res) => {
        console.log("view users");
        res.status(200).send("");
    })
    router.post('/:user_id', (req, res) => {
        console.log("create new user");
        res.status(200).send("");
    })

    router.get('/:user_id', (req, res) => {
        console.log("view a user");
        res.status(200).send("");
    })
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
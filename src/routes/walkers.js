"use strict"

import express from 'express';
const router = express.Router({mergeParams: true});

export default (knex) => {
    router.get('/', (req, res) => {
        console.log("view walkers");
        res.status(200).send("");
    })
    router.post('/:walker_id', (req, res) => {
        console.log("create new walker");
        res.status(200).send("");
    })

    router.get('/:walker_id', (req, res) => {
        console.log("view a walker");
        res.status(200).send("");
    })
    router.put('/:walker_id', (req, res) => {
        console.log("update walker profile");
        res.status(200).send("");
    })
    router.delete('/:walker_id', (req, res) => {
        console.log("delete walker");
        res.status(200).send("");
    })
    return router;
}
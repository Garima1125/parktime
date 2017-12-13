"use strict"

import express from 'express';
const router = express.Router({mergeParams: true});


export default (knex) => {
    router.get('/', (req, res) => {
        console.log("view all schedules");
        res.status(200).send("");
    })
    router.get('/:schedule_id', (req, res) => {
        console.log("view a schedule");
        res.status(200).send("");
    })
    router.delete('/:schedule_id', (req, res) => {
        console.log("delete a schedule");
        res.status(200).send("");
    })
    return router;
}
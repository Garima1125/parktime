"use strict"

import express from 'express';
import uuid from 'uuid/v4';
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

    router.post('/new', (req, res) => {
        let newSchedule = {
            schedule_id: uuid(),
            schedule_start_time: req.body.schedule_start_time,
            schedule_end_time: req.body.schedule_end_time,
            schedule_status: "created",
            schedule_job_id: req.body.schedule_job_id
        };

        knex('schedules').insert(newSchedule).returning('*').then(result => {
            console.log("created a schedule" + JSON.stringify(result));
            res.status(200).send("schedule created");
        }).catch(err =>{
            res.status(500).send("error, schedule cant be created");
        });
    })


    router.delete('/:schedule_id', (req, res) => {
        console.log("delete a schedule");
        res.status(200).send("");
    })
    return router;
}
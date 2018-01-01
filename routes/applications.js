"use strict"

import express from 'express';
import uuid from 'uuid/v4';
const router = express.Router({mergeParams: true});

export default (knex) => {
    router.get('/', (req, res) => {
        console.log("view all applications");
        res.status(200).send("");
    })
    router.get('/:application_id', (req, res) => {
        console.log("view a application");
        res.status(200).send("");
    })

    router.post('/new', (req, res) => {
        let newApplication = {
            application_id: uuid(),
            application_start_time: req.body.application_start_time,
            application_end_time: req.body.application_end_time,
            application_status: "created",
            application_job_id: req.body.application_job_id
        };

        knex('applications').insert(newApplication).returning('*').then(result => {
            console.log("created a application" + JSON.stringify(result));
            res.status(200).send("application created");
        }).catch(err =>{
            res.status(500).send("error, application cant be created");
        });
    })


    router.delete('/:application_id', (req, res) => {
        knex('applications').where('application_id', req.params.application_id)
        .update('application_deleted_at', knex.fn.now())
        .then(result => {
            console.log('application deleted');
            res.status(200).send("application deleted");
        }).catch(err => {
            console.log(err);
            res.status(500).send("error, application cant be deleted");
        })
    })
    return router;
}
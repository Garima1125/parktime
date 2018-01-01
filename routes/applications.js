"use strict"

import express from 'express';
import uuid from 'uuid/v4';
const router = express.Router({mergeParams: true});

export default (knex) => {
    
    router.get('/', (req, res) => {
        let user_id = '1';
        knex('applications').select().where('application_job_id', req.params.job_id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).send(err);
        });
    })

    router.post('/new', (req, res) => {
        let user_id = '1';

        let newApplication = {
            application_id: uuid(),
            application_status: "created",
            application_job_id: req.params.job_id,
            application_description: req.body.description,
            applicant_id: user_id
        };

        console.log(newApplication);

        knex('applications').insert(newApplication).returning('*').then(result => {
            console.log("created a application" + JSON.stringify(result));
            res.status(200).send("application created");
        }).catch(err =>{
            res.status(500).send(err);
        });
    })

    router.put('/:application_id', (req, res) => {

        // TODO: update job status to offered as well

        // TODO: once PAID, update job status to complete, update job walker_id to user_id
        
        knex('applications')
            .update('application_status', 'offered')
            .where('application_id', req.params.application_id)
            .then(result => {
                res.json(result);
            }).catch(err => {
                res.status(500).send(err);
            });
    })

    router.get('/:application_id', (req, res) => {
        console.log("view a application");
        res.status(200).send("");
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
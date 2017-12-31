"use strict"

import express from 'express';
import schedulesRoutes from './schedules';
import paymentsRoutes from './payments';
import uuid from 'uuid/v4';

const router = express.Router({mergeParams: true});

export default (knex) => {
    router.use('/:job_id/schedules', schedulesRoutes(knex));
    router.use('/:job_id/payments', paymentsRoutes(knex));
   
    router.get('/', (req, res) => {
        console.log("view all jobs");
        res.status(200).send("");
    })
    router.post('/new', (req, res) => {
        
        let newJob = {
            job_id: uuid(),
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            job_rate: req.body.job_rate,
            job_status: 'created',
            job_dog_id: req.body.job_dog_id
        };
        
        knex('jobs').insert(newJob).returning('*').then(result =>{
            console.log("created a job");
            res.status(200).send("job created");
        }).catch(err =>{
            res.status(500).send('Error, job cannot be created');
        });
    })
       
    router.get('/:job_id', (req, res) => {
        console.log("view a job");
        res.status(200).send("");
    })
    router.put('/:job_id', (req, res) => {
        console.log("update a job");
        res.status(200).send("");
    })

    router.delete('/:job_id', (req, res) => {
        knex('jobs').where('job_id', req.params.job_id)
        .update('job_deleted_at', knex.fn.now())
        .then(result => {
            console.log('job deleted');
            res.status(200).send("job deleted");
        }).catch(err => {
            res.status(500).send(err);
        });
        return;
    })
    
    return router;
}
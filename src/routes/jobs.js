"use strict"

import express from 'express';
import schedulesRoutes from './schedules';
import paymentsRoutes from './payments';
const router = express.Router({mergeParams: true});

export default (knex) => {
    router.use('/:job_id/schedules', schedulesRoutes(knex));
    router.use('/:job_id/payments', paymentsRoutes(knex));
   
    router.get('/', (req, res) => {
        console.log("view all jobs");
        res.status(200).send("");
    })
    router.post('/', (req, res) => {
        console.log("create a job");
        res.status(200).send("");
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
        console.log("delete a job");
        res.status(200).send("");
    })
    return router;
}
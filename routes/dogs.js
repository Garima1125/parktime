"use strict"

import express from 'express';
import jobsRoutes from './jobs';
import { read } from 'fs';
import schedules from './schedules';
import uuid from 'uuid/v4';
const router = express.Router({mergeParams: true});

export default (knex) => {
    // console.log(jobsRoutes(knex));
    router.use('/:dog_id/jobs', jobsRoutes(knex));

    router.post('/new', (req, res) => {
        let newDog = {
            dog_id: uuid(),
            dog_name: req.body.dog_name,
            dog_age: req.body.dog_age,
            dog_breed: req.body.dog_breed,
            dog_description: req.body.dog_description,
            owner_id: req.user.user_id
        }
        knex('dogs').insert(newDog).returning('*').then(result =>{
            console.log(JSON.stringify(result));
            res.status(200).send("dog created");
        }).catch(err =>{
            res.status(500).send('Error, dog cannot be created');
        });
    })

    router.get ('/all', (req, res) => {
        // TODO: get from session
        let user_id = req.user.user_id;
        console.log(user_id);
        knex.raw(`select * from users
        left join dogs on dogs.owner_id = users.user_id and dog_deleted_at is null
        left join jobs on dogs.dog_id = jobs.job_dog_id and job_deleted_at is null
        left join schedules on jobs.job_id = schedules.schedule_job_id and schedule_deleted_at is null
        where user_id = ?`, [user_id])
        .then(result => {
            console.log(result);
            //console.log(JSON.stringify(result.rows, null, 4));
            // group schedules by job
            let jobs = {};
            for (let row of result.rows) {
                if (row.job_id in jobs) {
                    if (row.schedule_id != null) {
                        jobs[row.job_id].schedules.push ({
                            schedule_id: row.schedule_id,
                            schedule_start_time: row.schedule_start_time,
                            schedule_end_time: row.schedule_end_time,
                            schedule_status: row.schedule_status,
                            schedule_job_id: row.schedule_job_id
                        });
                    }
                } else {
                    let job = {
                        job_id: row.job_id,
                        job_title: row.job_title,
                        job_description: row.job_description,
                        job_rate: row.job_rate,
                        job_status: row.job_status,
                        // temporary
                        dog: {
                            dog_id: row.dog_id,
                            dog_name: row.dog_name,
                            dog_age: row.dog_age,
                            dog_breed:row.dog_breed,
                            dog_description: row.dog_description
                        }
                    }

                    // only keep what we want in schedule
                    if (row.schedule_id != null) {
                        job.schedules = [{
                            schedule_id: row.schedule_id,
                            schedule_start_time: row.schedule_start_time,
                            schedule_end_time: row.schedule_end_time,
                            schedule_status: row.schedule_status,
                            schedule_job_id: row.schedule_job_id
                        }]
                    } else {
                        job.schedules = [];
                    }
                    jobs[row.job_id] = job;
                }
            }

            // // group jobs by dog

            let dogs = {};
            for (let job_id in jobs) {
                let job = jobs[job_id];
                if (job.dog.dog_id in dogs){
                    let dog_id = job.dog.dog_id;
                    delete job.dog;
                    dogs[dog_id].jobs.push(job);
                } else {
                    let dog = {
                        dog_id: job.dog.dog_id,
                        dog_name: job.dog.dog_name,
                        dog_age: job.dog.dog_age,
                        dog_breed: job.dog.dog_breed,
                        dog_description: job.dog.dog_description
                    }
                    let dog_id = job.dog.dog_id;
                    delete job.dog;
                    dog.jobs = [job];
                    dogs[dog_id] = dog;
                }
            }
            res.json(Object.values(dogs));

        }).catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    });

    router.get('/:dog_id', (req, res) => {
        console.log("view a dog");
        res.status(200).send("");
    })
    router.put('/:dog_id', (req, res) => {
        console.log("update dog profile");
        res.status(200).send("");
    })

    router.delete('/:dog_id', (req, res) => {
        knex('dogs').where('dog_id', req.params.dog_id)
        .update('dog_deleted_at', knex.fn.now())
        .then(result => {
            console.log('dog deleted');
            res.status(200).send("dog deleted");
        }).catch(err => {
            res.status(500).send(err);
        });
    })
    return router;
}

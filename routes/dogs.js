"use strict"

import express from 'express';
import jobsRoutes from './jobs';
import { read } from 'fs';
import schedules from './schedules';
const router = express.Router({mergeParams: true});

export default (knex) => {
    // console.log(jobsRoutes(knex));
    router.use('/:dog_id/jobs', jobsRoutes(knex));

    router.post('/', (req, res) => {
        console.log("create new dog");
        res.status(200).send("");
    })

    router.get ('/all', (req, res) => {
        // TODO: get from session
        let user_id = '1';
        // user_id in sesion
        // extract owner_id from user_id
        knex
        .select()
        .from('users')
        .fullOuterJoin('owners', 'users.user_id', 'owners.owner_user_id')
        .fullOuterJoin('dogs', 'dogs.dog_owner_id','owners.owner_id')
        .fullOuterJoin('jobs', 'dogs.dog_id', 'jobs.job_dog_id')
        .fullOuterJoin('schedules','schedules.schedule_job_id','jobs.job_id')
        .where ('users.user_id', user_id)
        .orderBy('dogs.dog_id')
        .then(rows => {
            console.log(JSON.stringify(rows, null, 4));
            // group schedules by job
            let jobs = {};
            for (let row of rows) {
                if (row.job_id in jobs) {
                    jobs[row.job_id].schedules.push ({
                        schedule_id: row.schedule_id,
                        schedule_start_time: row.schedule_start_time,
                        schedule_end_time: row.schedule_end_time,
                        schedule_status: row.schedule_status
                    });
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
                    job.schedules = [{
                        schedule_id: row.schedule_id,
                        schedule_start_time: row.schedule_start_time,
                        schedule_end_time: row.schedule_end_time,
                        schedule_status: row.schedule_status
                    }]
                    jobs[row.job_id] = job;
                }
            }

            // group jobs by dog 

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
        console.log("delete dog");
        res.status(200).send("");
    })
    return router;
}


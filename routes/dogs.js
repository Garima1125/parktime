"use strict"

import express from 'express';
import jobsRoutes from './jobs';
import { read } from 'fs';
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
        .fullOuterJoin('owners', 'users.user_id', 'owners.user_id')
        .fullOuterJoin('dogs', 'dogs.owner_id','owners.owner_id')
        .fullOuterJoin('jobs', 'dogs.dog_id', 'jobs.dog_id')
        .fullOuterJoin('schedules','schedules.job_id','jobs.job_id')
        .where ('users.user_id', user_id)
        .orderBy('dogs.dog_id')
        .then(schedules => {

            /*
            let jobs = {
                'job_id': {
                    'job_id': '',
                    'title': '',
                    'description': '',
                    'rate': '',
                    'status': '',
                    'schedules': []
                }
            };
            */

            // group schedules by job
            let jobs = {};
            for (let schedule of schedules) {
                console.log(`schedule_id: ${schedule.schedule_id}`);
                if (schedule.job_id in jobs) {
                    jobs[schedule.job_id].schedules.push({
                        schedule_id: schedule.schedule_id,
                        start_time: schedule.start_time,
                        end_time: schedule.end_time,
                        status: schedule.status
                    });
                } else {
                    let job = {
                        job_id: schedule.job_id,
                        title: schedule.title,
                        description: schedule.description,
                        rate: schedule.rate,
                        status: schedule.status,
                        dogs: {
                            dog_id: schedule.dog_id,
                            name: schedule.name,
                            age: schedule.age,
                            breed: schedule.breed
                        }
                    }
                    // only keep what we want in schedule
                    job.schedules = [{
                        schedule_id: schedule.schedule_id,
                        start_time: schedule.start_time,
                        end_time: schedule.end_time,
                        status: schedule.status
                    }]
                    jobs[schedule.job_id] = job;
                }
            }

            /*
            let dogs = {
                'dog_id': {
                    'dog_id': '',
                    'name': '',
                    age: 8,
                    breed: '',
                    description: '',
                    jobs: [
                        {

                        }
                    ]
                }
            }
            */

            let dogs = {};
            for (let job_id in jobs) {
                console.log(`job_id: ${job_id}`);
                let job = jobs[job_id];
                if (job.dogs.dog_id in dogs) {
                    let dog_id = job.dogs.dog_id;
                    delete job.dogs;
                    dogs[dog_id].jobs.push(job);
                } else {
                    let dog = {
                        dog_id: job.dogs.dog_id,
                        name: job.dogs.name,
                        age: job.dogs.age,
                        breed: job.dogs.breed,
                        //description: job.description,
                    }
                    let dog_id = job.dogs.dog_id;
                    delete job.dogs;
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


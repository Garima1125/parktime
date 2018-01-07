"use strict"

import express from 'express';
import uuid from 'uuid/v4';
const router = express.Router({mergeParams: true});

export default (knex) => {
    
    router.get('/', (req, res) => {
        knex('applications').select().where('application_job_id', req.params.job_id).then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).send(err);
        });
    })

    router.post('/', (req, res) => {
        if (req.user.user_type !== 'walker') {
            res.status(403).send('please register as walker to apply');
            return;
        }
        
        let user_id = req.user.user_id;

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
            res.json({msg: "application created"});
        }).catch(err =>{
            res.status(500).json(err);
        });
    })

    router.put('/:application_id', (req, res) => {
        // update application stauts to incomplete
        knex('applications')
            .update('application_status', 'incomplete')
            .where('application_id', req.params.application_id)
            .returning('*')
            .first()
            .then(result => {
                
                console.log(result)
                knex('jobs')
                    .update('walker_id', result.applicant_id)
                    .where('job_id', result.application_job_id)
                    .returning('*')
                    .then(data => {
                        console.log(data);
                        res.json(data);
                    }).catch(err => {
                        console.log('job error');
                        console.log(err);
                        res.status(500).json(err);
                    })
            }).catch(err => {
                console.log('app error');
                console.log(err);
                res.status(500).json(err);
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
"use strict"

import express from 'express';
const router = express.Router({mergeParams: true});

export default (knex) => {

    // get all jobs that the walker has applied to
    router.get('/jobs', (req, res) => {


    })


    router.get('/', (req, res) => {
        console.log("view walkers");
        res.status(200).send("");
    })
    router.post('/:walker_id', (req, res) => {
        console.log("create new walker");
        res.status(200).send("");
    })

    router.get('/:walker_id', (req, res) => {
        console.log("view a walker");
        res.status(200).send("");
    })
    router.put('/:walker_id', (req, res) => {
        console.log("update walker profile");
        res.status(200).send("");
    })
    router.delete('/:walker_id', (req, res) => {
        console.log("delete walker");
        res.status(200).send("");
    })

   router.get('/profile/view/:user_email',(req,res) => {
      var user_email = req.params.user_email;
      knex
      .from('users')
      .innerJoin('walkers', 'users.user_id', 'walkers.walker_user_id')
      .innerJoin('users_detail', 'users.user_id','users_detail.user_id')
      .where('users.user_email',user_email)
      .then(function(results){
          res.status(200).send(results);

      })
   })





    return router;
}

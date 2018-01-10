"use strict"

import express from 'express';
import uuid from 'uuid/v4';
const router = express.Router({mergeParams: true});

export default (knex) => {
    router.get('/', (req, res) => {
        console.log("view all reviews");
        res.status(200).send("");
    })
    // router.post('/:review_id', (req, res) => {
    //     console.log("create a review");
    //     res.status(200).send("");
    // })
    // router.get('/:review_id', (req, res) => {
    //     console.log("view a review");
    //     res.status(200).send("");
    // })
    // router.put('/:review_id', (req, res) => {
    //     console.log("update a review");
    //     res.status(200).send("");
    // })
    // router.delete('/:review_id', (req, res) => {
    //     console.log("delete a review");
    //     res.status(200).send("");
    // })

    router.post('/new', (req, res) => {
      console.log(req.body);
      let review = {
        review_id: uuid(),
        review_rating: req.body.rating,
        review_comment: req.body.review_comment,
        review_created_at: new Date(),
        reviewer_id: req.body.reviewer_id,
        reviewee_id: req.body.reviewee_id
      }
      knex
      .insert(review)
      .into('reviews')
      .then((result) => {
        console.log(result);
        res.status(200).send({'review_created': true});
      }).catch((err) => {
        res.send(500).send("Review Can not be created.")
      })
    });

    router.get('/:user_id/all', (req, res) => {
      console.log(req);
      var user_id = req.params.user_id;
      knex
      .select('*')
      .from('reviews')
      .innerJoin('users', 'reviews.reviewer_id', 'users.user_id')
      .where('reviewee_id', user_id)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      }).catch((err) => {
        res.status(500).send(err);
      });
      // knex query
    })
    return router;
}

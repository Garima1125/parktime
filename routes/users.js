"use strict"

import express from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import uuid from 'uuid/v4';
import reviewsRoutes from './reviews';
const router = express.Router({mergeParams: true});


export default (knex) => {

  router.use('/:user_id/reviews', reviewsRoutes(knex));

  // get current logged-in user
  router.get('/', (req, res) => {
    let response = {};
    if (req.user) {
      response = req.user;
    }
    res.json(response);
  });

  // profile update
  router.post('/update', (req, res) => {

    console.log(req.body.first_name)
    knex('users')
    .where('user_id', req.body.user_id)
    .update({
      user_first_name: req.body.first_name,
      user_last_name: req.body.last_name,
      user_type: req.body.type,
      user_address: req.body.address,
      user_postal_code: req.body.postal_code,
      user_latitude: req.body.user_latitude,
      user_longitude: req.body.user_longitude,
      user_unit_number: req.body.unit_number,
      user_city: req.body.city,
      user_province: req.body.province,
      user_country: req.body.country,
      user_phone:req.body.phone,
      user_picture: req.body.picture,
      user_description:req.body.description
    })
    .then(result => {
      res.status(200).send(result);
      console.log(result)
    }).catch(err =>{
      console.log(err)
      res.status(500).send(err)
    })

    //knex('users').update('')
    //req.body.
    // update user profile
  })

  // create local user
  router.post('/', (req, res) => {
    let user = {
      user_id: uuid(),
      user_email: req.body.username,
      user_password: bcrypt.hashSync(req.body.password, 10),
      user_type: 'pending'
    };
    console.log(user);
    knex('users').insert(user).returning('*').then(result => {

      // logs user in after registration
      req.params.username = req.body.username;
      req.params.password = req.body.password;
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile');
      })

    }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
  })

  router.delete('/:user_id', (req, res) => {
    console.log("delete user");
    res.status(200).send("");
  })


    router.get('/walkers', (req, res) => {
        knex
        .select()
        .from('users')
        .fullOuterJoin('users_detail', 'users.user_id', 'users_detail.user_id')
        .fullOuterJoin('walkers', 'users_detail.user_id', 'walkers.walker_user_id')
        .where('user_city', 'toronto')
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).send(err);
        })
    })

    router.post('/', (req, res) => {
      console.log(req.body);
      res.status(200).send();
    });

    router.get('/:user_id', (req, res) => {
        users.where("user_id", req.params.id).fetch()
        .then (result => {
            res.status(200).send(result);
        }, err => {
            res.status(500),send("Error");
        });
    });

    router.put('/:user_id', (req, res) => {
        console.log("update user profile");
        res.status(200).send("");
    })


    router.post('/auth/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        knex
            .select("user_id","user_password", "user_type")
            .from("users")
            .where("user_email", req.body.email)
            .then(function(results) {
                console.log('results ', results)
                if(results.length === 0) {
                knex
                  .insert({
                      user_id: uuid(),
                      user_email: req.body.email,
                      user_password: bcrypt.hashSync(req.body.password, 5)
                  })
                  .into('users')
                  .returning('*')
                  .then(function() {
                    res.send({authenticated: true});
                  })
                }
                else {
                  bcrypt.compare(password, results[0].user_password, function(err, result) {
                    console.log("result", result);
                    if(result) {
                      res.send({authenticated: true, userType: results[0].user_type});
                    } else {
                      res.status(403);
                    }
                  });
                }
        });

    });

// owner's Routes
router.post('/profile/createowner',(req, res) => {

 knex
 .select("user_id")
 .from('users')
 .where('user_email',req.body.user_email)
 .then(function(result){
   var user_id = result[0].user_id;
    knex
     .insert({
       owner_id:uuid(),
       owner_user_id: user_id
     })
     .into('owners')
     .then(function(){
       knex('users')
       .where('user_id',user_id)
       .update({
         user_first_name: req.body.user_first_name,
         user_last_name: req.body.user_last_name,
         user_type:'owner'
        })
       .then(function(){
         knex('users_detail')
         .insert({
           user_picture: req.body.user_picture,
           user_postal_code: req.body.user_postal_code,
           user_latitude: req.body.user_latitude,
           user_longitude: req.body.user_longitude,
           user_address: req.body.user_address,
           user_unit_number: req.body.user_unit_number,
           user_country: req.body.user_country,
           user_province: req.body.user_province,
           user_city: req.body.user_city,
           user_phone: req.body.user_phone,
           user_detail_id: uuid(),
           user_id: user_id
         })
         .then(function() {
           res.status(200).send({ownerCreated: true});
         })
       })
     })
})
});


// walker's routes
    router.post('/profile/create', (req, res) => {
      console.log(req.body);
      knex
        .select("user_id")
        .from('users')
        .where('user_email',req.body.user_email)
        .then(function(result){
          var user_id = result[0].user_id;
           knex
           .insert({
             walker_id: uuid(),
             walker_experience: req.body.walker_experience,
             walker_description: req.body.walker_description,
             walker_expected_payrate:req.body.walker_expected_payrate,
             walker_bank_name: req.body.walker_bank_name,
             walker_account_number: req.body.walker_account_number,
             walker_user_id: user_id
           })
           .into('walkers')
           .then(function(){
             knex('users_detail')
             .insert({
                 user_picture: req.body.user_picture,
                 user_postal_code: req.body.user_postal_code,
                 user_latitude: req.body.user_latitude,
                 user_longitude: req.body.user_longitude,
                 user_detail_id: uuid(),
                 user_id: user_id
             })
            .then(function(){
                 knex('users')
                 .where('user_id',user_id)
                 .update({
                   user_first_name: req.body.user_first_name,
                   user_last_name: req.body.user_last_name,
                   user_type: 'walker'
                 })
               .then(function() {
                 res.status(200).send({profileCreated: true, userType: 'walker'});
               })
             })
           })


        })

    });

    return router;
}

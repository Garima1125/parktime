"use strict"

import express from 'express';
import reviewsRoutes from './reviews';
const router = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

export default (knex) => {
    router.use('/:user_id/reviews', reviewsRoutes(knex));

    router.get('/whoami', (req, res) => {
      let user_id = '1';
      knex('users').select(['user_id', 'user_first_name', 'user_last_name', 'user_email']).where('user_id', user_id).where('user_deleted_at', null).limit(1).then(user => {
        res.json(user);
      }, err => {
        res.status(500).send(err);
      });
    });

    router.get('/', (req, res) => {
        knex('users')
            .select('*')
            .then(result => {
                res.status(200).send(result);
            }, err => {
                res.status(500).send('Error');
            });
    });

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
    router.delete('/:user_id', (req, res) => {
        console.log("delete user");
        res.status(200).send("");
    })

    router.post('/auth/google', (req, res) => {
        console.log(req.body);
        let user = {
            user_password: '',
            user_first_name: req.body.givenName,
            user_last_name: req.body.familyName,
            user_email: req.body.email,
            user_id: req.body.googleId
        };

        knex
            .select("user_id")
            .from("users")
            .where("user_email", user.user_email)
            .then(function(results) {
                if(results.length === 0) {
                knex
                  .insert(user)
                  .into('users')
                  .then(function() {
                    res.send({"authenticated": "true"});
                  })
                }
                else {
                  res.send({"authenticated": "true"});
                }
            });
    });


    router.post('/auth/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        knex
            .select("user_id","user_password")
            .from("users")
            .where("user_email", req.body.email)
            .then(function(results) {
                console.log('results ', results)
                if(results.length === 0) {
                knex
                  .insert({
                      user_id: uuidv4(),
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
                      res.send({authenticated: true});
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
       owner_id:uuidv4(),
       owner_user_id: user_id
     })
     .into('owners')
     .then(function(){
       knex('users')
       .where('user_id',user_id)
       .update({
         user_first_name: req.body.user_first_name,
         user_last_name: req.body.user_last_name,
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
           user_detail_id: uuidv4(),
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
             walker_id: uuidv4(),
             walker_experience: req.body.walker_experience,
             walker_description: req.body.walker_description,
             walker_expected_payrate:req.body.walker_expected_payrate,
             walker_bank_name: req.body.walker_bank_name,
             walker_account_number: req.body.walker_account_number,
             walker_user_id: user_id
           })
           .into('walkers')
           .then(function(){
             knex('users')
             .where('user_id',user_id)
             .update({
               user_first_name: req.body.user_first_name,
               user_last_name: req.body.user_last_name,
             })
             .then(function(){
               knex('users_detail')
               .insert({
                 user_picture: req.body.user_picture,
                 user_postal_code: req.body.user_postal_code,
                 user_latitude: req.body.user_latitude,
                 user_longitude: req.body.user_longitude,
                 user_detail_id: uuidv4(),
                 user_id: user_id
               })
               .then(function() {
                 res.status(200).send({profileCreated: true});
               })
             })
           })


        })

    });

    return router;
}

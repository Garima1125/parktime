"use strict";

import express from 'express';
import dogsRoutes from './routes/dogs';
import usersRoutes from './routes/users'
import walkersRoutes from './routes/walkers'
import ownersRoutes from './routes/owners'
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static("public"));

//---routes---------------------------
let knex = null;
// console.log(dogsRoutes(knex));
// console.log(usersRoutes(knex));
// console.log(walkersRoutes(knex));
// console.log(ownersRoutes(knex));

app.use('/dogs', dogsRoutes(knex));
app.use('/users', usersRoutes(knex));
app.use('/walkers', walkersRoutes(knex));
app.use('/owners', ownersRoutes(knex));

app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);  
})
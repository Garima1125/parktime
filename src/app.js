"use strict";

import express from 'express';
import dogsRoutes from './routes/dogs';
import usersRoutes from './routes/users'
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.static("public"));


//---routes---------------------------
let knex = null;
app.use('/dogs', dogsRoutes(knex));
app.use('/users', usersRoutes(knex));

app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);  
})
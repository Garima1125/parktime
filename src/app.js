"use strict";

import express from 'express';
//import index from './routes/index';
import dogsRoutes from './routes/dogs';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static("public"));

let knex = null;

//---routes---------------------------
//app.use('/', index);
app.use('/dogs', dogsRoutes(knex));

app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);  
})
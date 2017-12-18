"use strict";

import path from 'path';
import express from 'express';
import dogsRoutes from './routes/dogs';
import usersRoutes from './routes/users'
import walkersRoutes from './routes/walkers'
import ownersRoutes from './routes/owners'

const PORT = process.env.PORT || 8080;
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

//---routes---------------------------
let knex = null;

app.use(express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('main');
});


app.use('/dogs', dogsRoutes(knex));
app.use('/users', usersRoutes(knex));
app.use('/walkers', walkersRoutes(knex));
app.use('/owners', ownersRoutes(knex));

app.listen(PORT, () =>{
    console.log("ParkTime API server listening on port" + PORT);  
})
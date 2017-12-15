# ParkTime API Server

## Routes

### users
* C - /users/:user_id - post
    - google login
    - {email, first_name, last_name, image}
    - find email and see if its in user database
    - 
* R - /users/:user_id - get
#* U - /users/:user_id - put
#* D - /users/:user_id - delete

### walkers
* B - /walkers - get
* C - /walkers/:walker_id - post
* R - /walkers/:walker_id - get
* U - /walkers/:walker_id - put
* D - /walkers/:walker_id - delete

### owners 
* B - /owners - get
* C - /owners/:owner_id - post
* R - /owners/:owner_id - get
* U - /owners/:owner_id - put
* D - /owners/:owner_id - delete

### dogs
* B - /dogs - get - N/A
* C - /dogs/:dog_id - post
* R - /dogs/:dog_id - get
* U - /dogs/:dog_id - put
* D - /dogs/:dog_id - delete

### schedules (state: incomplete complete cancelled)
* B - /dogs/:dog_id/jobs/:job_id/schedules - get
* C - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - post - N/A
* R - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - get
* U - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - put - optional
* D - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - delete

### jobs (state: created offered confirmed) (schedules)
* B - /dogs/:dog_id/jobs - get 
* C - /dogs/:dog_id/jobs/:job_id - post 
* R - /dogs/:dog_id/jobs/:job_id - get
* U - /dogs/:dog_id/jobs/:job_id - put
* D - /dogs/:dog_id/jobs/:job_id - delete

### payments
* C - /dogs/:dog_id/jobs/:job_id/payments/:payment_id - post 
* R - /dogs/:dog_id/jobs/:job_id/payments/:payment_id - get 

### reviews
* C - /users/:user_id/reviews - get
* R - /users/:user_id/reviews/:reviews_id - post

# License

MIT

# Notes

make email primary key for users


npm install --save react
npm install --save react-dom
npm install --save-dev babel-core
npm install --save-dev babel-cli
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react
npm install --save-dev react-hot-loader
npm install --save-dev webpack
npm install --save-dev webpack-dev-middleware
npm install --save-dev webpack-hot-middleware
# ParkTime API Server

## Routes

### users
* B - /users - get
* C - /users/:user_id - post
* R - /users/:user_id - get
* U - /users/:user_id - put
* D - /users/:user_id - delete

### dogs
* B - /dogs - get - N/A
* C - /dogs/:dog_id - post
* R - /dogs/:dog_id - get
* U - /dogs/:dog_id - put
* D - /dogs/:dog_id - delete

### schedule (state: incomplete complete cancelled)
* B - /dogs/:dog_id/jobs/:job_id/schedules - get
* C - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - post - N/A
* R - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - get
* U - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - put - optional
* D - /dogs/:dog_id/jobs/:job_id/schedules/:schedule_id - delete

### job (state: created offered confirmed) (schedules)
* B - /dogs/:dog_id/jobs - get 
* C - /dogs/:dog_id/jobs/:job_id - post 
* R - /dogs/:dog_id/jobs/:job_id - get
* U - /dogs/:dog_id/jobs/:job_id - put
* D - /dogs/:dog_id/jobs/:job_id - delete

# License

MIT

# Notes

make email primary key for users
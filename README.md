# ParkTime API Server

## Routes

##### users
B - /users - get
C - /users/:id - post
R - /users/:id - get
U - /users/:id - put
D - /users/:id - delete

##### dogs
B - /dogs - get - N/A
C - /dogs/:id - post
R - /dogs/:id - get
U - /dogs/:id - put
D - /dogs/:id - delete

##### schedule (state: incomplete complete cancelled)
B - /dogs/:id/jobs/:id/schedules - get
C - /dogs/:id/jobs/:id/schedules/:id - post - N/A
R - /dogs/:id/jobs/:id/schedules/:id - get
U - /dogs/:id/jobs/:id/schedules/:id - put - optional
D - /dogs/:id/jobs/:id/schedules/:id - delete

##### job (state: created offered confirmed) (schedules)
B - /dogs/:id/jobs - get 
C - /dogs/:id/jobs/:id/ - post 
R - /dogs/:id/jobs/:id/ - get
U - /dogs/:id/jobs/:id/ - put
D - /dogs/:id/jobs/:id/ - delete

# License

MIT

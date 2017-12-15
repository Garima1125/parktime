
exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedules', (table) => {
    table.increments('schedule_id').primary();
    table.timestamp('start_time');
    table.timestamp('end_time');
    table.string('status');
    table.integer('job_id').unsigned().references('job_id').inTable('jobs');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedules');
};

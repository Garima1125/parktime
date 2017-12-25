exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedules', (table) => {
    table.string('schedule_id').primary();
    table.timestamp('start_time');
    table.timestamp('end_time');
    table.string('status');
    table.string('job_id').unsigned().references('job_id').inTable('jobs');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedules');
};

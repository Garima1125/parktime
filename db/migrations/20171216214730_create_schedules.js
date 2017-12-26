exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedules', (table) => {
    table.string('schedule_id').primary();
    table.timestamp('schedule_start_time');
    table.timestamp('schedule_end_time');
    table.string('schedule_status');
    table.string('job_id').unsigned().references('job_id').inTable('jobs');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedules');
};

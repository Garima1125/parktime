exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', (table) => {
    table.string('job_id').primary();
    table.string('job_title');
    table.text('job_description');
    table.decimal('job_rate');
    table.string('job_status');
    table.string('job_dog_id').references('dog_id').inTable('dogs');
    table.string('walker_id').references('user_id').inTable('users');
    table.timestamp('job_created_at');
    table.datetime('job_deleted_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs');
};

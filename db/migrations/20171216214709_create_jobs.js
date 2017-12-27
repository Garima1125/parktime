exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', (table) => {
    table.string('job_id').primary();
    table.string('job_title');
    table.text('job_description');
    table.decimal('job_rate');
    table.string('job_status');
    table.string('job_dog_id').references('dog_id').inTable('dogs');
    table.string('job_walker_id').references('walker_id').inTable('walkers');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs');
};

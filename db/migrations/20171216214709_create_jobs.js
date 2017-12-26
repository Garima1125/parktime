exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', (table) => {
    table.string('job_id').primary();
    table.string('job_title');
    table.text('job_description');
    table.decimal('job_rate');
    table.string('job_status');
    table.string('dog_id').unsigned().references('dog_id').inTable('dogs');
    table.string('walker_id').unsigned().references('walker_id').inTable('walkers');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs');
};

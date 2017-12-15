
exports.up = function(knex, Promise) {
  return knex.schema.createTable('jobs', (table) => {
    table.increments('job_id').primary();
    table.string('title');
    table.text('description');
    table.decimal('rate');
    table.string('status');
    table.integer('dog_id').unsigned().references('dog_id').inTable('dogs');
    table.integer('owner_id').unsigned().references('owner_id').inTable('owners');
    table.integer('walker_id').unsigned().references('walker_id').inTable('walkers');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('jobs');
};

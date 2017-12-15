
exports.up = function(knex, Promise) {
 return knex.schema.createTable('payments', (table) => {
  table.increments('payment_id').primary();
  table.integer('job_id').unsigned().references('job_id').inTable('jobs');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('payments');
};

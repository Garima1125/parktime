
exports.up = function(knex, Promise) {
 return knex.schema.createTable('payments', (table) => {
  table.string('payment_id').primary();
  table.string('payment_job_id').references('job_id').inTable('jobs');
  table.datetime('payment_deleted_at');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('payments');
};

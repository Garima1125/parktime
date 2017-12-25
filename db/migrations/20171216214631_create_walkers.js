exports.up = function(knex, Promise) {
  return knex.schema.createTable('walkers', (table) => {
    table.string('walker_id').primary();
    table.string('experience');
    table.string('description');
    table.string('bank_name');
    table.string('account_number');
    table.string('user_id').unsigned().references('user_id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('walkers');
};

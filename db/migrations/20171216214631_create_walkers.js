exports.up = function(knex, Promise) {
  return knex.schema.createTable('walkers', (table) => {
    table.string('walker_id').primary();
    table.string('walker_experience');
    table.string('walker_description');
    table.string('walker_bank_name');
    table.string('walker_account_number');
    table.string('walker_user_id').unsigned().references('user_id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('walkers');
};

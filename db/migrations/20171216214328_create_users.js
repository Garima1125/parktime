exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.string('user_id').primary();
    table.string('user_first_name');
    table.string('user_last_name');
    table.string('user_email');
    table.string('user_password');
    table.datetime('user_deleted_at');
    table.string('user_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

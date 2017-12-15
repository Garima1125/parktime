
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('user_id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email');
    table.string('postal_code');
    table.string('address');
    table.string('unit_number');
    table.string('city');
    table.string('province');
    table.string('country');
    table.string('phone');
    table.string('picture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

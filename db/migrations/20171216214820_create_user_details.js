exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_detail', (table) => {
    table.increments('user_detail_id').primary();
    table.string('postal_code');
    table.string('address');
    table.string('unit_number');
    table.string('city');
    table.string('province');
    table.string('country');
    table.string('phone');
    table.string('picture');
    table.integer('user_id').unsigned().references('user_id').inTable('users');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_detail');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', (table) => {
    table.increments('owner_id').primary();
    table.string('card_type');
    table.bigInteger('card_number');
    table.integer('expiry_year');
    table.integer('expiry_month');
    table.integer('cvv');
    table.integer('user_id').unsigned().references('user_id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};

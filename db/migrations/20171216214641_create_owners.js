
exports.up = function(knex, Promise) {
  return knex.schema.createTable('owners', (table) => {
    table.string('owner_id').primary();
    table.string('owner_card_type');
    table.bigInteger('owner_card_number');
    table.integer('owner_expiry_year');
    table.integer('owner_expiry_month');
    table.integer('owner_cvv');
    table.string('owner_user_id').references('user_id').inTable('users');
    table.datetime('owner_deleted_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('owners');
};

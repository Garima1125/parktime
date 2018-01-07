exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.string('user_id').primary();
    table.string('user_first_name');
    table.string('user_last_name');
    table.string('user_email');
    table.string('user_password');
    table.string('user_type');
    table.string('user_postal_code');
    table.string('user_address');
    table.string('user_unit_number');
    table.string('user_city');
    table.string('user_province');
    table.string('user_country');
    table.string('user_phone');
    table.text('user_picture');
    table.decimal('user_latitude', 9, 6);
    table.decimal('user_longitude', 9, 6);
    table.string('user_description');
    table.datetime('user_deleted_at');
  });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};

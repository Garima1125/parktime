
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', (table) => {
    table.string('dog_id').primary();
    table.string('name');
    table.integer('age');
    table.string('breed');
    table.text('description');
    table.string('owner_id').unsigned().references('owner_id').inTable('owners');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dogs');
};

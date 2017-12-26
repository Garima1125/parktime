
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', (table) => {
    table.string('dog_id').primary();
    table.string('dog_name');
    table.integer('dog_age');
    table.string('dog_breed');
    table.text('dog_description');
    table.string('owner_id').unsigned().references('owner_id').inTable('owners');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dogs');
};

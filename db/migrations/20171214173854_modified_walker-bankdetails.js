
exports.up = function(knex, Promise) {
  return knex.schema.table('walkers', (table) => {
    table.string('bank_name');
    table.string('account_number');
    table.dropColumn('bank_details');
  });


};

exports.down = function(knex, Promise) {
  return knex.schema.table('walkers', (table) => {
    table.dropColumn('bank_name');
    table.dropColumn('account_number');
    table.string('bank_details');
  });
};



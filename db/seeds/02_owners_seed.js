const ownersdata = require('../ownersdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('owners').del()
    .then(function () {
      // Inserts seed entries
      return knex('owners').insert(ownersdata);
    });
};

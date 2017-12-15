const walkersdata = require('../walkersdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('walkers').del()
    .then(function () {
      // Inserts seed entries
      return knex('walkers').insert(walkersdata);
    });
};

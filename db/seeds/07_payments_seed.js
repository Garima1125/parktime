const paymentsdata = require('../paymentsdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('payments').del()
    .then(function () {
      // Inserts seed entries
      return knex('payments').insert(paymentsdata)
    });
};

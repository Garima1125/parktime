const usersdetailsdata = require('../usersdetailsdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_detail').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_detail').insert(usersdetailsdata);
    });
};
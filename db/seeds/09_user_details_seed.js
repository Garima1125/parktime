const usersdetailsdata = require('../usersdetailsdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_detail').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_detail').insert(usersdetailsdata);
    });
};
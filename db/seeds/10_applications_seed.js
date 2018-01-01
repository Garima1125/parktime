const applicationsdata = require('../applicationsdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('applications').del()
    .then(function () {
      // Inserts seed entries
      return knex('applications').insert(applicationsdata);
    });
};
const dogsdata = require('../dogsdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dogs').del()
    .then(function () {
      // Inserts seed entries
      return knex('dogs').insert(dogsdata);
        
    });
};

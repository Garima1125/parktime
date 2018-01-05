const reviewsdata = require('../reviewsdata');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert(reviewsdata);
        
    });
};

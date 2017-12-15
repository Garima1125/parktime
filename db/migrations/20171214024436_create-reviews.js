
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('review_id').primary();
    table.integer('rating');
    table.text('comment');
    table.timestamp('created_at');
    table.integer('reviewer_id').unsigned().references('user_id').inTable('users');
    table.integer('reviewee_id').unsigned().references('user_id').inTable('users');
    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};

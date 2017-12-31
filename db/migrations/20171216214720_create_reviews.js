
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', (table) => {
    table.string('review_id').primary();
    table.integer('review_rating');
    table.text('review_comment');
    table.timestamp('review_created_at');
    table.string('reviewer_id').references('user_id').inTable('users');
    table.string('reviewee_id').references('user_id').inTable('users');
    table.datetime('review_deleted_at');
    
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};

exports.up = function(knex, Promise) {
    return knex.schema.createTable('applications', (table) => {
     table.string('application_id').primary();
     table.string('application_description');
     table.string('application_status');
     table.string('applicant_id').references('user_id').inTable('users');
     table.string('application_job_id').references('job_id').inTable('jobs');
     table.datetime('application_deleted_at');
   });
   };
   
   exports.down = function(knex, Promise) {
     return knex.schema.dropTable('applications');
   };
   
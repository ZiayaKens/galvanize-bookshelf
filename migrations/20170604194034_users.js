
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments('id').primary();
    table.string('first_name').notNullable().default('');
    table.string('last_name').notNullable().default('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password','char(60)').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('users');
};

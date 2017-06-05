
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments('id').primary();
    table.string('title', 255).notNullable().default('');
    table.string('author', 255).notNullable().default('');
    table.string('genre').notNullable().default('');
    table.text('description').notNullable().default('');
    table.text('cover_url').notNullable().default('');
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable("books");
};

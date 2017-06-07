
exports.up = function(knex, Promise){
    return knex.schema.createTable('favorites', function(table){
      table.increments('id').primary();
      table.integer('book_id').notNullable();
      table.foreign('book_id').references('books.id').onDelete('CASCADE');
      table.integer('user_id').notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
      table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};

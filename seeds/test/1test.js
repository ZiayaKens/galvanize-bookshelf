const booksdata = require('../../book.js');

// console.log(booksdata[0]['id'], ' ', booksdata[0]['title'], ' ', booksdata[0]['author']);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('books').insert({
          id: booksdata[0]['id'],
          title: booksdata[0]['title'],
          author: booksdata[0]['author'],
          genre: booksdata[0]['genre'],
          description: booksdata[0]['description'],
          cover_url: booksdata[0]['cover_url'],
          created_at: booksdata[0]['created_at'],
          updated_at: booksdata[0]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[1]['id'],
          title: booksdata[1]['title'],
          author: booksdata[1]['author'],
          genre: booksdata[1]['genre'],
          description: booksdata[1]['description'],
          cover_url: booksdata[1]['cover_url'],
          created_at: booksdata[1]['created_at'],
          updated_at: booksdata[1]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[2]['id'],
          title: booksdata[2]['title'],
          author: booksdata[2]['author'],
          genre: booksdata[2]['genre'],
          description: booksdata[2]['description'],
          cover_url: booksdata[2]['cover_url'],
          created_at: booksdata[2]['created_at'],
          updated_at: booksdata[2]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[3]['id'],
          title: booksdata[3]['title'],
          author: booksdata[3]['author'],
          genre: booksdata[3]['genre'],
          description: booksdata[3]['description'],
          cover_url: booksdata[3]['cover_url'],
          created_at: booksdata[3]['created_at'],
          updated_at: booksdata[3]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[4]['id'],
          title: booksdata[4]['title'],
          author: booksdata[4]['author'],
          genre: booksdata[4]['genre'],
          description: booksdata[4]['description'],
          cover_url: booksdata[4]['cover_url'],
          created_at: booksdata[4]['created_at'],
          updated_at: booksdata[4]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[5]['id'],
          title: booksdata[5]['title'],
          author: booksdata[5]['author'],
          genre: booksdata[5]['genre'],
          description: booksdata[5]['description'],
          cover_url: booksdata[5]['cover_url'],
          created_at: booksdata[5]['created_at'],
          updated_at: booksdata[5]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[6]['id'],
          title: booksdata[6]['title'],
          author: booksdata[6]['author'],
          genre: booksdata[6]['genre'],
          description: booksdata[6]['description'],
          cover_url: booksdata[6]['cover_url'],
          created_at: booksdata[6]['created_at'],
          updated_at: booksdata[6]['updated_at']
        }),
        knex('books').insert({
          id: booksdata[7]['id'],
          title: booksdata[7]['title'],
          author: booksdata[7]['author'],
          genre: booksdata[7]['genre'],
          description: booksdata[7]['description'],
          cover_url: booksdata[7]['cover_url'],
          created_at: booksdata[7]['created_at'],
          updated_at: booksdata[7]['updated_at']
        })
      ]);
    });
};


var data = require('../../favinfo');
// console.log(data);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('favorites').insert(data)
      ]);
    }).then(function(){
      return knex.raw("SELECT setval('favorites_id_seq', (SELECT MAX(id) FROM favorites))")
    });
};

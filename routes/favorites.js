'use strict';
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express');
const parse = require('body-parser');
const knex = require('../knex.js');
const jot = require('jsonwebtoken');
const crypt = require('bcrypt');
const hump = require('humps');
const cookiePar = require('cookie-parser');
const saltRounds = 10;

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(parse.urlencoded({ extended: false }));
router.use(parse.json());
router.use(cookiePar());

// YOUR CODE HERE
router.get('/favorites', function(req,res,next){
  var cookie = req.cookies.token;
  jot.verify(cookie, process.env.secret, function(err, decoded){
    selectAlmostAll(decoded, res);
  });
})

router.get('/favorites/check?bookId=1', function(req,res,next){
  var cookie = req.cookies.token;
  console.log(cookie);
  jot.verify(cookie, process.env.secret, function(err, decoded){

  });
})

function selectAlmostAll(decoded, res){
  var tokenid = decoded.id;
  knex.select('favorites.id', 'favorites.book_id', 'favorites.user_id', 'books.created_at', 'books.updated_at', 'books.title', 'books.author', 'books.genre', 'books.description', 'books.cover_url')
  .where('favorites.id', tokenid)
  .from('favorites')
  .fullOuterJoin('books', 'books.id', '=', 'favorites.book_id')
  .fullOuterJoin('users', 'users.id', '=', 'favorites.user_id')
  .then(function(table){
    var format = hump.camelizeKeys(table)
    res.send(format);
  })
}
module.exports = router;

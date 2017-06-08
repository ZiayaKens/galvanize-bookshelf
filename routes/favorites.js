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
router.use('/favorites', function(req,res,next){
  var cookie = req.cookies.token;
  if(cookie === undefined){
    res.set('content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  }
  else{
    next();
  }
})

router.get('/favorites', function(req,res,next){
  var cookie = req.cookies.token;
  jot.verify(cookie, process.env.secret, function(err, decoded){
      if(err){
        throw err;
      }
      else{
        selectAlmostAll(decoded, res);
      }
    });
});

router.get('/favorites/check?', function(req,res,next){
  var token = req.cookies.token;
  jot.verify(token, process.env.secret, function(err, decoded){         //now that they are verified, does the user have a favorite book with ___ id
    if(err){
      throw err;
    }
    else{
      isThatMyFavoriteBook(res, req, decoded);
    }
  });
});

router.post('/favorites', function(req,res,next) {
  var token = req.cookies.token;

  jot.verify(token, process.env.secret, function(err, decoded){         //now that they are verified, does the user have a favorite book with ___ id
    if (err) {
      throw err;
    }
    else {
      addBook(req, res, decoded);
    }
  });
});

router.delete('/favorites', function(req,res,next){
  var token = req.cookies.token;

  jot.verify(token, process.env.secret, function(err, decoded){         //now that they are verified, does the user have a favorite book with ___ id
    if (err) {
      throw err;
    }
    else {
      removeBooks(req, res, decoded);
    }
  });
})

function removeBooks(req,res,decoded){
  var user = decoded.id;
  knex('favorites').where('user_id', user).andWhere('book_id', req.body.bookId).then(function(table){
   var result = Object.assign({}, table[0])
    knex('favorites').where('user_id', user).andWhere('book_id', req.body.bookId).del().then(function(delcount){
      delete result.created_at;
      delete result.updated_at;
      delete result.id;
      res.send(hump.camelizeKeys(result));
    })
  })
}

function addBook(req, res, decoded) {
 knex('favorites')
      .insert({book_id:req.body.bookId,user_id:decoded.id})
      .then(function() {

        knex('favorites')
        .where('favorites.book_id', '=',req.body.bookId)
        .andWhere('favorites.user_id', '=', decoded.id)
        .then(function(table){
          var result = Object.assign({}, table[0]);
          delete result['created_at'];
          delete result['updated_at'];
          res.send(hump.camelizeKeys(result))
        })
      })
    }






function isThatMyFavoriteBook(res, req, decoded){                                                     // this function should only be called when the token is verified and the data requested is allowed for that id
  knex('favorites').then(function(table){
    for(var i=0; i<table.length; i++){
      if(table[i]['book_id'] == req.query.bookId && table[i]['user_id'] == decoded.id){
        res.send(true);
      }
      else{
        res.send(false);
      }
    }
  });
}

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

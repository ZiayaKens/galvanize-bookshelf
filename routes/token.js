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


// const secret = "notThePassWordYoureLookingFor"
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

router.use(parse.urlencoded({ extended: false }));
router.use(parse.json());
router.use(cookiePar());

router.get('/token', function(req,res,next){
    var token = req.cookies.token;
    if(token != undefined){
      res.send(true);
    }
    else{
      res.status(200);
      var response = JSON.parse('false');
      res.send(response);
    }
})


router.post('/token', function(req,res,next){
  knex('users').then(function(table){
    if(crypt.compareSync(req.body.password, table[0].hashed_password) && req.body.email ==table[0].email){
      var newobj = {};
      for (var key in table[0]){
          newobj[key] = table[0][key];
      }
      delete newobj['hashed_password'];
      delete newobj['created_at'];
      delete newobj['updated_at'];
      newobj = jot.sign(newobj,process.env.secret);
      res.cookie('token', newobj, {'httpOnly': true});
      var returned = hump.camelizeKeys(table[0]);
      delete returned.hashedPassword;
      res.send(returned);
    }
    else{
      res.status(400);
      res.setHeader('content-type', 'text/plain');
      res.send('Bad email or password');
    }
  }).catch(function(err){
    console.log(err);
  });
});


router.delete('/token', function(req,res,next){
    res.cookie('token', '', {'httpOnly': true});
    res.send(true);
});

module.exports = router;

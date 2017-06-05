'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex.js')
const humps = require('humps');               // helps change the key formatting from capitol to _
const crypt = require('bcrypt');
const saltrounds = 10;


// YOUR CODE HERE

router.post('/users', function(req, res, next){
  var obj = {};                 //reformatted new obj to work for updating the tabel
  for(var key in req.body){                         //the object that comes in has capitol letters in some keys and the database table have '_'s so you need to make a new object thats almost the same but fits the table syntax so that you can update the table with the new obj

    if(key == 'firstName'){                             //one of the keys that needs to be changed
      var hump = humps.decamelize(key);                   // middleware to change from capitol to _
      obj[hump] = req.body[key];                   // building the new object with the correct key but the value doesnt change
    }
    else if(key == 'lastName'){                  //updated_at happens automatically in an update, so its key doesnt need to be fixed and added
      let hump = humps.decamelize(key);
      obj[hump] = req.body[key];
    }
    else if(key == 'password'){
        obj['hashed_password'] = crypt.hashSync(req.body[key], saltrounds);

    }
    else {                                      //all other keys and values keep the same for the new object
      obj[key] = req.body[key];
    }
  }
  knex.max('id').from('users').then(function(table){
    obj['id'] = table[0]['max'] +1;              //read the max value from the id column
    req.body['id'] = table[0]['max'] +1;
    knex('users').insert(obj).returning(['email', 'first_name', 'id', 'last_name']).then(function(table){
      delete req.body.password
      res.send(req.body);
    })                 // added 1 to the max id, and set that value to the id for the new entry (incrementing)
    // res.send('');
  });
})

module.exports = router;

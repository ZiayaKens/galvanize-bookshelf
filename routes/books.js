'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const knex = require('../knex.js')
const humps = require('humps');               // helps change the key formatting from capitol to _

// YOUR CODE HERE

router.get('/books', function(req, res, next){
  knex.select().from('books').orderBy('title').then(function(table){
    var result = [];                                                  // table was an arry so im rebuilding an array
    for(var i=0; i<table.length; i++){                              // looping through the objects in the array
        let entry = {};                                             //each array item is an object of the  books key value pairs so im rebuilding objects each time
        for(let key in table[i]){
          if(key == 'cover_url'){
            let hump = humps.camelize(key)
            entry[hump] = table[i][key];
          }
          else if(key == 'updated_at'){
            let hump = humps.camelize(key)
            entry[hump] = table[i][key];
          }
          else if(key == 'created_at'){
            let hump = humps.camelize(key)
            entry[hump] = table[i][key];
          }
          else {
            entry[key] = table[i][key];
          }
        }
        result.push(entry);                 // pushing the object into the array
    }
    res.send(result);                       // sending the reformatted data
    next();
  });
});

router.get('/books/:id', function(req, res, next){
  console.log();
  knex.select().from('books').where({id: req.params.id}).then(function(table){
    var entry ={};
    for(let key in table[0]){
      if(key == 'cover_url'){
        let hump = humps.camelize(key)
        entry[hump] = table[0][key];
      }
      else if(key == 'updated_at'){
        let hump = humps.camelize(key)
        entry[hump] = table[0][key];
      }
      else if(key == 'created_at'){
        let hump = humps.camelize(key)
        entry[hump] = table[0][key];
      }
      else {
        entry[key] = table[0][key];
      }
    }
    res.send(entry);
  });
});


router.post('/books', function(req, res, next){               //the new entry they wanna send doesnt come with an id, need to add it
  knex.max('id').from('books').then(function(table){
    req.body['id'] = table[0]['max'] +1;              //read the max value from the id column
    knex('books').insert(req.body);                   // added 1 to the max id, and set that value to the id for the new entry (incrementing)
    res.send(req.body);
  });
});


router.patch('/books/:id', function (req, res, next){
  var obj = {};                 //reformatted new obj to work for updating the tabel
  for(var key in req.body){                         //the object that comes in has capitol letters in some keys and the database table have '_'s so you need to make a new object thats almost the same but fits the table syntax so that you can update the table with the new obj

    if(key == 'coverUrl'){                             //one of the keys that needs to be changed
      var hump = humps.decamelize(key);                   // middleware to change from capitol to _
      obj[hump] = req.body[key];                   // building the new object with the correct key but the value doesnt change
    }
    else if(key == 'createdAt'){                  //updated_at happens automatically in an update, so its key doesnt need to be fixed and added
      let hump = humps.decamelize(key);
      obj[hump] = req.body[key];
    }
    else {                                      //all other keys and values keep the same for the new object
      obj[key] = req.body[key];
    }
  }
  knex('books').where({id: req.params.id}).update(obj);           //use this .where to find which row in the table to update, also obj is correctly formatted so its keys match the column names of the table
  req.body['id'] = Number(req.params.id);                   // add the ID of what was changed to the original object
  res.send(req.body);                                   //send back the original object after the id was added
});

router.delete('/books/:id', function(req, res, next){
  console.log(req.params.id);

  knex.select().from('books').where({id: req.params.id}).then(function(table){    // gatta read the table so i can send back what we deleted
    // console.log(table);
    var entry ={};                                                        // gatta reformat the table keys so they look how we want
    for(let key in table[0]){
      if(key == 'cover_url'){
        let hump = humps.camelize(key)
        entry[hump] = table[0][key];
      }
      else if(key == 'updated_at'){
        let hump = humps.camelize(key)
        entry[hump] = table[0][key];
      }
      else if(key == 'created_at'){
        let hump = humps.camelize(key)
        entry[hump] = table[0][key];
      }
      else if(key != 'id'){                                               //dont need to know what id it was when returning what was deleted.
        entry[key] = table[0][key];
      }
    }
    knex.del('books').where({id: req.params.id});                         // now that our object is made, delete the entry
    res.send(entry);
  });
});



router.use(function(err){
  console.error('crap');
});


module.exports = router;

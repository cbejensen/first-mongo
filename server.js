var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

// mongo
var db = mongojs('library');
var Book = db.collection('books');

// express
var app = express();

// middleware
app.use(bodyParser());
app.use(cors());

// ENDPOINTS - CRUD
// create
app.post('/books', function(req, res, next) {
  Book.insert(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

// read
app.get('/books', function(req, res, next) {
  // we will use an empty object to find everything
  Book.find({}, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

// update
app.put('/books/:id', function(req, res, next) {
  // first argument is object we want to change
  // second argument is replacement info
  // third argument is function to carry out upon completion
  Book.update({_id: mongojs.ObjectId(req.params.id)}, req.body, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

// delete
app.delete('/books/:id', function(req, res, next) {
  Book.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, result) {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})


// connection
var port = 8000;
app.listen(port, function() {
  console.log('Listening on ' + port)
})


var obj = {
  "title": "Spaghetti: Forced to Eat It",
  "author": "Garfield",
  "year": 190
}
  
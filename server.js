/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var shortid = require('shortid');
//const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});
let books = [];
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res) {

      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      return res.json(books.map(book => ({
        _id: book.id,
        title: shortid.title,
        commentcount: book.comment.length
      })))
    })

    .post(function (req, res) {
      var { title } = req.body;
      const newBook = {
        _id: shortid.generate(),
        title,
        comments: []
      }
      books.push(newBook);
      return res.json(newBook)
      //response will contain new book object including atleast _id and title
    })

    .delete(function (req, res) {
      books = [];
      return res.json({
        success: 'Delete succesful'
      })
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      var { id } = req.params;
      return res.json(books.find(book => book._id === id));
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function (req, res) {
      var { id } = req.params;
      var { comment } = req.body;
      books = books.map(book => {
        if (book._id === id) {
          book.comments.push(comment);
        }
        return book;
      })
      //json res format same as .get
      return res.json(books.find(book => book._id === id));
    })

    .delete(function (req, res) {
      var { id } = req.params;
      books = books.filter(book => book._id !== id);
      return res.send('book with id: ${id} was deleted')
      //if successful response will be 'delete successful'
    });

};

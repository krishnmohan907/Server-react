const mongoose = require("mongoose");
const Addbooks = mongoose.model("BOOK");
let path = require('../../config/one.json')
const userlibrary = require("../../library/mongolibrary/userlibrary");
const fs = require("fs");
module.exports.booksadded = (request, response) => {
  var addbooks = new Addbooks({
    book_id: request.body.book_id,
    book_name: request.body.book_name,
    book_author: request.body.book_author,
    book_shop: request.body.book_shop,
    created_by: request.body.created_by,
    created_at: new Date(),
    updated_at: new Date(),
  });
  userlibrary
    .insertCollection(addbooks)
    .then((resp) => {
      response.status(200).json({
        status: 200,
        success: true,
        message: "book inserted",
        data: resp,
      });
    })
    .catch((err) => {
      response.status(200).json({
        status: 500,
        success: failed,
        message: "books not failed",
        data: null,
      });
    });
};

module.exports.getbboks = (req, res) => {
  const response = getData();
  // userlibrary
  //   .commonselectquery(Addbooks)
  //   .then((resp) => {
  //     res.status(200).json({
  //       status: 200,
  //       success: true,
  //       message: "fetck books",
  //       data: resp,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(200).json({
  //       status: 500,
  //       success: false,
  //       message: "books data failed",
  //       data: null,
  //     });
  //   });
  res.status(200).json({
          status: 200,
          success: true,
          message: "fetck books",
          data: response,
        });
};

module.exports.updatebook = (req, res) => {
  var addbooks = {
    book_id: req.body.book_id,
    book_name: req.body.book_name,
    book_author: req.body.book_author,
    book_shop: req.body.book_shop,
    created_by: req.body.created_by,
    created_at: new Date(),
    updated_at: new Date(),
  };
  userlibrary
    .updatecollection(Addbooks, { book_id: req.body.book_id }, addbooks)
    .then((resp) => {
      res.status(200).json({
        status: 200,
        success: true,
        message: "updated book",
        data: resp,
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.status(200).json({
        status: 500,
        success: false,
        message: "not updated book",
        data: null,
      });
    });
};

function getData() {
  let format =
  {
    "message": "Success",
    "data": [
      {
        "id": 1,
        "title": "Item 1",
        "description": "Description 1"
      }
    ]
  }
  return format;
}




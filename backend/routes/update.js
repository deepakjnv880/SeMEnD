const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Posts = require('../models/Posts');

router.post('/', (req, res, next) => {
    var token=req.body['headers']['Authorization'];
    token=token.split(" ")[1];
    const decoded = jwt.verify(token, 'my_secret_key');

    Posts.find({ _id:  req.body['info']['post_id']})
    .exec()
    .then(post=>{

      if(!post[0]['taken_by']){
        console.log("bhai book koi na liya tha");
        Posts.update({ _id: req.body['info']['post_id'] }, { $set: { taken_by: decoded['email'] }})
        .exec()
        .then(res=>console.log("document updated : - ",res))
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
      else if(post[0].taken_by==decoded['email']){
        console.log("bhai book hm liye the chor rhe hai ab");
        Posts.update({ _id: req.body['info']['post_id'] }, { $set: { taken_by: '' }})
        .exec()
        .then(res=>console.log("document updated : - ",res))
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });
  module.exports = router;
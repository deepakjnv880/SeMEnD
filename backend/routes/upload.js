const express = require('express');
const router = express.Router();
const multer = require('multer');//Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files.
const jwt = require('jsonwebtoken');
const Posts = require('../models/Posts');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" +Date.now()+file.originalname.replace(/ /g, '_'));//here g(global modifier) means replace all
  }
});

var upload = multer({ storage: storage })

router.post('/', upload.single('file'), (req, res, next) => {
  // /console.log(req.body.file,"================== > ",req.file);
  // console.log("====>>",req.file.originalname);
  // console.log("====>>>",req.file.filename);
  var filename="";
  if(req.file){
    console.log("------------>",req.file);
    filename=req.file.filename;
  }
  const decoded = jwt.verify(req.body['token'], 'my_secret_key');
  // console.log(decoded);
  // var temp=
  // req.file.filename="dlvmd"
  // if(!req.file)
  const post = new Posts({
    creater: decoded['email'],
    image_path: filename,
    text: req.body['written_text'],
    taken_by: ""
  });
  post.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
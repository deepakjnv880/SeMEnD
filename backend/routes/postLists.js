const posts = require('../models/Posts');
const express = require('express');
const router = express.Router();

router.get('/',(req,res,cb)=>{
    // res.send("dodmcld,");
    posts.find()
    .exec()
    .then(post=>{
        // console.log("===> > ",json(post));
        res.status(200).json(post);
    })
    .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          }
    );
});
module.exports = router;
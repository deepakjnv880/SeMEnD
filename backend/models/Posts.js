const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  creater: { type: String, required: true },
  text: { type: String, required: true },
  image_path: { type: String},
  taken_by: {type: String}
});

module.exports = mongoose.model('posts', PostSchema);

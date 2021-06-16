const mongoose = require('mongoose');

const BookmarkSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },

  recipe: {
    type: JSON
    }
  
});

module.exports = mongoose.model('bookmark', BookmarkSchema);

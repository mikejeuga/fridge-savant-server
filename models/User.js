const mongoose = require('mongoose');
const brcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: false,
    unique: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', UserSchema);

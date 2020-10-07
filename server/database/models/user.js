const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30
  },
  surname: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    maxlength: 32
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
    trim: true
  },
  role: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);






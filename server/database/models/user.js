const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  surname: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
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






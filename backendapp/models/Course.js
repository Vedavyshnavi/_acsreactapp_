const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  coursename: {
        type: String,
        required: true,
      },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  file: {
    type: String, 
    required: true,
  },
});

const course = mongoose.model('Course', courseSchema);

module.exports = course;
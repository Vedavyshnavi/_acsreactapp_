const mongoose = require("mongoose")

const facultyschema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
    dateofbirth: {
      type: String,
      required: true
    },
    company: {
        type: String,
        required: true
      },
    id: {
      type: Number,
      required:true,
      unique:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      default:"bvd@001"
    },
    branch: {
      type: String,
      required: true
    },
    course: {
        type: String,
        required: true
      },
    section: {
        type: String,
        required: true,
       
      }, 
      address: {
        type: String,
        required: true 
      },
      contact: {
          type: String,
          required: true,
          unique:true
        }, 
  });

const faculty = mongoose.model('faculty', facultyschema);

module.exports = faculty;
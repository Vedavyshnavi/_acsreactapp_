const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female','others']   
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false // Exclude from query results for security
    },
    year: {
        type: Number,
        required: true
    },
    branch:{
        type:String,
        required:true,
        enum:['cse','ece','ai&ds','bba','mba','ba','bca','me','civil engineering','bio technology']
    },
    semester: {
        type: String,
        required: true,
        enum: ['odd', 'even','summer term','acceleration']
    },
    courses: [{
        type: String,
        required: true,
        enum: ['pfsd', 'mswd', 'jfsd', 'aws', 'os', 'dbms', 'ds', 'psqt', 'EP', 'MP', 'atfl', 'ddais', 'daa']
    }],
    section:{
        type:String,
        required:true,
        enum:['11','12','13','14','15','16','17','18','19','21','22','23','24','25','26','27','28','29','31','32','33','34','35','36','37','38']
    },
    faculty:{
        type:String,
        required:true,
        enum: ['j surya kiran','seetha','hari','akshay','karthik','ashok','srinivas','rajeswari','rajesh','naveen','sridevi','vyshnavi','akshith','khashim','priyanka','ajay','swetha','divya']
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
    },
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

const Faculty = require("../models/Faculty");
const Course = require("../models/Course");
const Student = require("../models/Student");
const Admin = require("../models/Admin")

const checkfacultylogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const faculty = await Faculty.findOne(input)
     response.json(faculty)
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const addstudent = async (request, response) => {
  try 
  {
    const input =  request.body;
    const student = new Student(input);
     await student.save();
    response.send('Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};

const viewstudents = async (request, response) => {
  try {
    const students = await Student.find();
    if (students.length === 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(students);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deletestudent = async (request, response) => {
  try {
    const email = request.params.email;
    const student = await Student.findOne({ "email": email });
    if (student !== null) {
      await Student.deleteOne({ "email": email });
      response.send("Deleted Successfully");
    } else {
      response.send("ID Not Found");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

 const addcourses = async (request, response) => {
  try 
  {
    const input =  request.body;
    const student = new Course(input);
     await student.save();
    response.send('Added Successfully');
  } 
  catch(e) 
  {
    response.status(500).send(e.message);
  }
};
const viewcourses = async (request, response) => {
  try {
    const students = await Course.find();
    if (students.length === 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(students);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

 module.exports = {checkfacultylogin,addcourses,addstudent,viewstudents,deletestudent,viewcourses}
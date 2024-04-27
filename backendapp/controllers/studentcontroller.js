const Student = require("../models/Student")
const Course = require("../models/Course");


const insertstudent = async (request, response) => {
    try 
    {
      const input =  request.body;
      const student = new Student(input);
       await student.save();

       const courses = input.courses;
       await Student.findByIdAndUpdate(student._id, { $set: { courses: courses } });
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  
  const checkstudentlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const student = await Student.findOne(input)
       response.json(student)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   

  const purchaseCourse = async (request, response) => {
    try {
      const { courseId, studentId } = request.body;
  
      // Check if both courseId and studentId are provided
      if (!courseId || !studentId) {
        return response.status(400).send('Course ID and Student ID are required.');
      }
  
      // Find the course by its ID
      const course = await Course.findById(courseId);
      if (!course) {
        return response.status(404).send('Course not found.');
      }
  
      // Find the student by their ID
      const student = await Student.findById(studentId);
      if (!student) {
        return response.status(404).send('Student not found.');
      }
  
      // Check if the student has already purchased the course
      if (student.courses.includes(courseId)) {
        return response.status(400).send('Student has already purchased this course.');
      }
  
      // Add the course to the student's courses
      student.courses.push(courseId);
      await student.save();
  
      // Return a success message
      response.status(200).send('Course purchased successfully.');
  
    } catch (error) {
      console.error('Error purchasing course:', error);
      response.status(500).send('An error occurred while purchasing the course.');
    }
  };
  
   


  module.exports = {insertstudent,checkstudentlogin,purchaseCourse}
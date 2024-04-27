const Course = require("../models/Course");
const Student = require("../models/Student");

const purchasecontroller = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    // Check if both courseId and studentId are provided
    if (!courseId || !studentId) {
      return res.status(400).send('Course Name and Student ID are required.');
    }

    // Find the course by its ID
    const course = await Course.findById(coursename);
    if (!course) {
      return res.status(404).send('Course not found.');
    }

    // Find the student by their ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send('Student not found.');
    }

    // Check if the student has already purchased the course
    if (student.courses.includes(courseId)) {
      return res.status(400).send('Student has already purchased this course.');
    }

    // Add the course to the student's courses
    student.courses.push(courseId);
    await student.save();

    // Return a success message
    res.status(200).send('Course purchased successfully.');

  } catch (error) {
    console.error('Error purchasing course:', error);
    res.status(500).send('An error occurred while purchasing the course.');
  }
};

module.exports = { purchasecontroller };

const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Faculty = require("../models/Faculty"); 
const Event = require("../models/Event");
const Course = require("../models/Course");


const multer = require('multer')
const path = require('path')
const fs = require('fs')

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
// Original code snippet where you save the course object
const addcourses = async (request, response) => {
  try {
    const input = request.body;

    // Create a new course object with the provided input
    const course = new Course({
      coursename: input.coursename,
      description: input.description,
      duration: input.duration,
      price: input.price,
      file: input.file // Assuming the file path is provided in the request body
    });

    // Save the course object
    await course.save();
    
    // Send a success response
    response.send('Added Successfully');
  } catch(e) {
    // Send an error response if an error occurs
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

const updatestudentprofile = async (request, response) => 
{
  try 
  {
    const input = request.body;
    const email = input.email; 
    const student = await Student.findOne({ email });
    if (!student) 
    {
      response.status(200).send('Student not found with the provided email id');
    }
    for (const key in input) 
    {
      if (key !== 'email' && input[key]) {
        student[key] = input[key];
      }
    }
    await student.save();
    response.status(200).send('Student Profile Updated Successfully');
  } 
  catch (e) 
  {
    response.status(500).send(e.message);
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

const checkadminlogin = async (request, response) => {
  try {
    const input = request.body;
    console.log(input);
    const admin = await Admin.findOne(input);
    response.json(admin);
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const addfaculty = async (request, response) => {
  try {
    const input = request.body;
    const faculty = new Faculty(input);
    await faculty.save();
    response.send('Added Successfully');
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const viewfaculty = async (request, response) => {
  try {
    const faculty = await Faculty.find();
    if (faculty.length === 0) {
      response.send("DATA NOT FOUND");
    } else {
      response.json(faculty);
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const deletefaculty = async (request, response) => {
  try {
    const uname = request.params.username;
    const faculty = await Faculty.findOne({ "username": uname });
    if (faculty !== null) {
      await Faculty.deleteOne({ "username": uname });
      response.send("Deleted Successfully");
    } else {
      response.send("Username Not Found");
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
};

const changeadminpwd = async (request, response) => {
  try 
  {
    const { username, oldpassword, newpassword } = request.body;

    const admin = await Admin.findOne({ username, password: oldpassword });
    
     if (!admin) 
    {
      response.status(400).send('Invalid Old Password');
    }
    else
    {
        if(oldpassword==newpassword)
        {
          response.status(400).send('Both Passwords are Same');
        }
        else
        {
          await Admin.updateOne({username},{ $set: { password: newpassword } });
           response.json('Password Updated Successfully');
        }
      
    }
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('file');

const createevent = async (req, res) =>
{
  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      const { category, title, description, date, location } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newEvent = new Event({
        category,
        title,
        description,
        date,
        file: fileName // Save only the file name
      });

      await newEvent.save();
      res.status(200).send('Event Created Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const viewevents = async (req, res) => 
{
  try 
  {
    const events = await Event.find();
    res.status(200).json(events);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const eventimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream(binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}


module.exports = {
  addstudent,
  viewstudents,
  updatestudentprofile,
  deletestudent,
  checkadminlogin,
  viewfaculty,
  addfaculty,
  deletefaculty,
  changeadminpwd,
  createevent,
  viewevents,
  eventimage,
  addcourses,
  viewcourses,
};
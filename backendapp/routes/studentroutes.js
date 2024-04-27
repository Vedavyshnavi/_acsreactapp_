const studentcontroller = require("../controllers/studentcontroller")

const express = require("express")
const studentrouter = express.Router()

// student routes
studentrouter.post("/insertstudent",studentcontroller.insertstudent)
studentrouter.post("/checkstudentlogin",studentcontroller.checkstudentlogin)
studentrouter.post("/purchase-course",studentcontroller.purchaseCourse)


module.exports = studentrouter
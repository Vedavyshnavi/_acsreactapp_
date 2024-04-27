const facultycontroller = require("../controllers/facultycontroller")

const express = require("express")
const facultyrouter =  express.Router()

//recruiter routes
facultyrouter.post("/checkfacultylogin",facultycontroller.checkfacultylogin)
facultyrouter.post("/addcourses", facultycontroller.addcourses)
facultyrouter.delete("/deletestudent/:email", facultycontroller.deletestudent)
facultyrouter.get("/viwecourses", facultycontroller.viewcourses)
facultyrouter.post("/addstudent",facultycontroller.addstudent)
facultyrouter.get("/viewstudents",facultycontroller.viewstudents)


module.exports = facultyrouter
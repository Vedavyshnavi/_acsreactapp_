const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter = express.Router()

// admin routes

adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)

adminrouter.post("/addstudent",admincontroller.addstudent)
adminrouter.post("/addcourse",admincontroller.addcourses)
adminrouter.get("/viewstudents",admincontroller.viewstudents)
adminrouter.get("/viewcourses",admincontroller.viewcourses)
adminrouter.put("/updatestudentprofile",admincontroller.updatestudentprofile)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
adminrouter.delete("/deletestudent/:email",admincontroller.deletestudent)

adminrouter.post("/addfaculty",admincontroller.addfaculty)
adminrouter.get("/viewfaculty",admincontroller.viewfaculty)
adminrouter.delete("/deletefaculty/:email",admincontroller.deletefaculty)



adminrouter.post("/createevent",admincontroller.createevent)
adminrouter.get("/viewevents",admincontroller.viewevents)
adminrouter.get("/eventimage/:filename",admincontroller.eventimage)

module.exports = adminrouter
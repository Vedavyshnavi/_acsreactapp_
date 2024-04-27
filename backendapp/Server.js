const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const dburl ="mongodb://localhost:27017/sdpproject32"
mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
    }).catch((err) => {
    console.log(err.message)
});


const app = express() 
app.use(express.json()) // to parse JSON data
app.use(cors())

const adminrouter = require("./routes/adminroutes")
const studentrouter = require("./routes/studentroutes")
const facultyrouter = require("./routes/facultyroutes")

app.use("",adminrouter)  //includes admin routes
app.use("",studentrouter)  //it includes jobseeker routes
app.use("",facultyrouter)


const port=2032
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})
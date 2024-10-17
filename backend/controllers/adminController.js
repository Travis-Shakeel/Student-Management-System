const asynHandler  = require("express-async-handler");
const Admin = require("../models/adminModel");
const Section = require("../models/sectionModel");
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");

const loginAdmin = asynHandler(async (req, res) => {

    const {email, password}  = req.body; 
    const userExits = await Admin.findOne({email});
    if(userExits)
    {
            let userPassword = userExits.password;
            let userId = userExits.id;
            if(password == userPassword)
            {
            res.json({
            found: true,
            id: userId
            })
            }
            else
            {
                res.json(
                    {
                        found: false
                    }
                )
            }
    }
    else 
    {
        res.json(
            {
                found: false
            }
        )
    }
});

const addSection = asynHandler(async (req, res) => {
    const{year,semester, instructor, day, location, courseId, startTime, endTime} = req.body;

    let id = Math.floor(Math.random()*10000);
    console.log(startTime);
    console.log(endTime);
    if(parseInt(startTime) < parseInt(endTime))
    {
    try{
        const section = new Section ({
            _id: id,
            year: year,
            semester: semester,
            instructor: instructor,
            day: day,
            students_id: [],
            location: location,
            course_id: courseId,
            start_time: startTime,
            end_time: endTime
        })
        console.log(section);
        console.log("-------------------------");
    section.save(function(err)
    {
        if(err)
        {
            res.json("Section Already Exists!");
        }
        else {
            res.json("Section is Created Successfully!");
        }
    });
    }catch(err)
    {
        res.json({status: "error1", error:'Duplicate section'});
    }
    }
    else 
    {
        res.json("Start time is greater than End time");
    }
})

const individualAdminData = asynHandler(async (req, res) => {

    Admin.findById(parseInt(req.params.id))
    .then(result => {
     res.status(200).json({
        admin:result
     })
    })
    .catch(err => {
     console.log(err);
     res.status(500).json({
         error:err
     })
    })
 });


 const removeSection = asynHandler(async (req, res) => {

    Section.deleteOne({ course_id: req.params.course_id}, function (err) {
        if(err) 
        {res.json(err)}
        else 
        {
        res.json("Section Successfully Removed");
        }
      });

 });


 const removeStudent = asynHandler(async (req, res) => {

    console.log("This is called ");
    Student.deleteOne({ email: req.params.email}, function (err) {
        if(err) 
        {res.json(err)}
        else 
        {
        res.json("Student Successfully Removed");
        }
      });

 });

 const allSections = asynHandler(async (req, res) => {
    Section.find().populate({
        path: 'course_id',
        model: 'Course'
    }).exec(async function (err, sections)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                res.json(sections);
            }
        })
});


module.exports = {loginAdmin, addSection,individualAdminData, removeSection,removeStudent, allSections};
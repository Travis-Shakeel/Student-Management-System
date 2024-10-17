const asynHandler  = require("express-async-handler");
const Student = require("../models/studentModel");
const Section = require("../models/sectionModel");
const Course = require("../models/courseModel");
const Post = require("../models/postModel");

const loginStudent = asynHandler(async (req, res) => {

    const {email, password}  = req.body; 
    const userExits = await Student.findOne({email});
    if(userExits)
    {
            let userPassword = userExits.password;
            let userId = userExits.id;
            console.log(userId);
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

const registerStudent = asynHandler(async (req, res) => {
    const{name, email, phoneNumber, address, password} = req.body;
    console.log("point1");
    let id = parseInt(Math.floor(Math.random()*100000));
    try{
    const student = new Student ({
        _id: id,
        name: name,
        email: email,
        phone_Number: phoneNumber,
        address: address,
        password: password,
        department_id: "1221",
        sections: [],
        currentFee: 0,
        loan: [{}],
        fees: [{}],
        Grades: [{}]
    });

    console.log(student);
    student.save(function(err)
    {
        if(err)
        {
            res.json("User Already Exists!");
        }
        else {
            res.json("User Registered Successfully");
        }
    });
    }catch(err)
    {
        res.json({status: "error1", error:'Duplicate email'});
    }

})

const allStudentData = asynHandler(async (req, res) => {
    const data  = await Student.find();
    res.json(data);
})

const individualStudentData = asynHandler(async (req, res) => {

   Student.findById(parseInt(req.params.id))
   .then(result => {
    res.status(200).json({
        student:result
    })
   })
   .catch(err => {
    console.log(err);
    res.status(500).json({
        error:err
    })
   })
});

const getEnrolledSections = asynHandler (async (req, res) => {
    Student.findById(req.params.id).populate({path:'sections', model: 'Section', populate: {
            path: 'course_id', model: 'Course'
    }}).exec(async function (err, sections)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(sections.sections);
        }
    })
}) 


const getFees = asynHandler( async (req, res) => {
    Student.findById(req.params.id).exec(function(err, fees)
    {
        if(err)
        {
            res.json(err)
        }
        else 
        {
            res.json(fees.fees);
        }
    })
})


const getCourses = asynHandler(async (req, res) => {
    Student.findById(req.params.id).populate({ path: 'sections', 
        populate:{
            path: 'course_id',
            model: 'Course'
        }}).exec(async function (err, sections)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {   
            const sects = sections.sections;
            const courss = sects.map(obj => obj.course_id);
            res.json(courss);
        }
    })
})

const updateFees = asynHandler(async (req, res) => {
    let id = req.params.id;
    const { upfees } = req.body;

    Student.findOneAndUpdate({_id: id}, {$set:{currentFee: upfees}}).exec(function(err)
    {
        if(err)
        {
            res.json(err);
        }
        else 
        {
            res.json("Update Successfull");
        }
    })
}) 

const addFees = asynHandler (async (req, res) => {
    let id = req.params.id;
    const {fees} = req.body;
    let nwFees = {
        tution_Fee: fees,
        date_of_Receipt: new Date()
    }
    Student.findOneAndUpdate({_id: req.params.id}, {$push: {fees: nwFees}}).exec(async function(err)
    {
        if(err)
        {
            res.json(err);
        }
        else 
        {
            res.json("Receipt added Successfully");
        }

    })
})

const getGrades = asynHandler(async (req, res) => {
    console.log(req.params.id);
    Student.findById(req.params.id).populate({ path: 'Grades', 
        populate:{
            path: 'course_id',
            model: 'Course'
        }}).exec(async function (err, grades)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {   
            res.json(grades.Grades);
        }
    })
}) 


const searchCourse = asynHandler(async (req, res) => {
    let nm = req.params.name

    Course.findOne({course_Name: nm}).exec(async function (err, course)
    {
        if(err)
        {
            console.log(err);
        }
        else if(course == null)
        {
            res.json(null);
        }   
        else{   
                const courseId = course._id;

            Section.findOne({course_id: courseId}).populate('course_id').exec(async function (err, section) {
                if(err)
                {
                    res.json(err);
                }
                else
                {   
                    console.log(section);
                    res.json(section);
                }
            })
        }
    })
    
}) 


const addCourse = asynHandler( async (req, res) => {
    const {section} = req.body;
    let arraySection = [];
    let notUni = false;
    Student.findById(req.params.id).exec(async function (err, sections)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                arraySection = sections.sections;
                for(let i=0; i<arraySection.length; i++)
                {
                    if(arraySection[i] == section)
                    {
                        notUni = true;
                        break;
                    }
                }

                if(!notUni)
                {
                    Student.findOneAndUpdate({_id: req.params.id}, {$push: {sections: section}}).exec(async function(err)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else 
                        {
                            Section.findOneAndUpdate({_id: req.body.section}, {$push: {students_id: req.params.id}}).exec(async function(err)
                            {
                                if(err)
                                {
                                    res.json(err);
                                }
                                else 
                                {
                                    res.json(true);
                                }
                            })
                        }
                    })

                }
                else
                {   
                        console.log("this sent");
                        res.json(false);
                }
            }
    })
});

const removeCourse = asynHandler(async (req, res) => {
    const {section} = req.body;
    let arraySection = [];
    let exist = true;
    Student.findById(req.params.id).exec(async function (err, sections)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                arraySection = sections.sections;
                for(let i=0; i<arraySection.length; i++)
                {
                    if(arraySection[i] == section)
                    {
                        exist = true;
                        break;
                    }
                    else 
                    {
                        exist = false;
                    }
                }
                    if(exist)
                    {
                    Student.findOneAndUpdate({_id: req.params.id}, {$pull: {sections: req.body.section}}).exec(async function(err)
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else 
                        {
                            Section.findOneAndUpdate({_id: req.body.section}, {$pull: {students_id: req.params.id}}).exec(async function(err)
                            {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else 
                                {
                                    res.json(true);
                                }
                            })
                        }
                    })
                    }
                    else 
                    {
                        res.json(false);
                    }
                }
})
})


const replyPost = asynHandler(async (req, res) => {
    console.log(req.params.id);
    const postID = req.params.id;
    const reply = {reply : req.body.content, date:req.body.date};
    Post.findOneAndUpdate({_id: req.params.id}, {$push: {replies: reply}}).exec(async function(err)
    {
        if(err)
        {
            res.json(err);
        }
        else
        {
            const PostExits = await Post.findOne({_id: postID});
            console.log(PostExits);
            if(PostExits)
            {
            res.json(true);
            }
            else
            {
            res.json("Post does not exist");
            }
        }
    })
})


const allPosts = asynHandler(async (req, res) => {
    const data = await Post.find();
    res.json(data);
})



const createPost = asynHandler(async (req, res) => {
    const { id, post_title, post_description } = req.body;

    try {
        const post = new Post({
            _id: id,
            post_title: post_title,
            post_description: post_description,
            replies: []
        })
        console.log(post);
        post.save(function (err) {
            if (err) {
                res.json({ status: "error", error: 'Error posting' });
            }
            else {
                res.json(true);
            }
        });
    } catch (err) {
        res.json({ status: "error", error: 'Error posting' });
    }
})


const editStudent = asynHandler(async (req, res) => {
    console.log("pont1");
    const {phoneNumber, address} = req.body;
    if(phoneNumber.length == 0 && address.length == 0)
    {
        console.log("pont2");
        res.json("No Changes, no values provided");
    }
    else if(phoneNumber.length == 0)
    {   console.log("pont3");
        Student.findOneAndUpdate({ _id: req.params.id }, { $set: {'address': address } }).exec(async function (err) {
            if (err) {
                res.json(err);
            }
            else {
    
                res.json("Edit Address Successfully");
    
            }
        })
    }
    else if(address.length == 0)
    {
        console.log("pont4");
        if(phoneNumber.match("[0-9]+") && phoneNumber.length == 10)
        {
        Student.findOneAndUpdate({ _id: req.params.id}, { $set: {'phone_Number': phoneNumber} }).exec(async function (err) {
            if (err) {
                res.json(err);
            }
            else {
    
                res.json("Edit Phone Number Successfully");
    
            }
        })
        }
        else 
        {
            res.json("Invalid Phone Number");
        }

    }
    else if(address.length != 0 && phoneNumber.length != 0)
    {
        console.log("pont5");
        if(phoneNumber.match("[0-9]+") && phoneNumber.length == 10)
        {
            Student.findOneAndUpdate({ _id: req.params.id }, { $set: { 'phone_Number': phoneNumber, 'address': address } }).exec(async function (err) {
        if (err) {
            res.json(err);
        }
        else {

            res.json("Edit Address and Phone Number Successfully");

        }
         })}
         else 
         {
            res.json("Invalid Fields");
         }
    }
    else 
    {
        res.json("Invalid Fields");
    }
})


const editStudentPassword = asynHandler(async (req, res) => {
    const {password} = req.body;
    if(password.length >= 7)
    {
    Student.findOneAndUpdate({ _id: req.params.id}, { $set: {'password': password} }).exec(async function (err) {
        if (err) {
            res.json(err);
        }
        else {
            res.json("Password Changed Successfully");
        }
    })
    }
    else if(password.length < 7)
    {
        res.json("Password must be at least 7 character's long");
    }
    else if(password.length == 0)
    {
        res.json("Empty Password, Please enter the password again");
    }
        
});

const addGrades = asynHandler(async (req, res) => {
    console.log("addGrades called");
    const em  = req.params.email;
    const userExits = await Student.findOne({email: em});
    if(userExits)
    {
    Student.findOneAndUpdate({ email: req.params.email }, { $push: {Grades: { 'letter_grade': req.body.letter_grade, course_id: req.body.course_id } } }).exec(async function (err) {
        if (err) {
            res.json(err);
        }
        else {
            res.json("added grade successfully");
        }
    })
    }
    else 
    {
        res.json("User does not exist");
    }
})


const singlePost = asynHandler(async (req, res) => {
    Post.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                post: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


module.exports = { loginStudent, singlePost, registerStudent, allStudentData, individualStudentData, getEnrolledSections, getFees, getCourses, updateFees, getGrades, searchCourse, addCourse, removeCourse, replyPost, allPosts, createPost, editStudent, addGrades, editStudentPassword, addFees};
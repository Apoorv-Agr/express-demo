const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
const coursesArr = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'}
];
app.get('/',(req,resp)=>{
    resp.send("hello World");
});

app.get('/api/courses',(req,resp)=>{
    resp.send(coursesArr);
});

app.get('/api/courses/:id',(req,resp)=>{
    let course_found = coursesArr.find( (element) => {
        return element.id === parseInt(req.params.id);
    })
    //return resp.send(course_found);
    if(!course_found){
        resp.status(404).send('The course with the given id was not found');
    } //404 error
    resp.send(course);
    //resp.send(req.params.id);
});
app.post('/api/courses',(req,resp)=>{
    const {error} = validateCourse(req.body);
    //console.log(result);
    if(error){
        resp.status(400).send(error.details[0].message);
        return;
    };
    const course = {
        id : coursesArr.length+1,
        name : req.body.name
    }
    coursesArr.push(course);
    resp.send(course);
});

app.put('/api/courses/:id',(req,resp) =>{
    let course_found = coursesArr.find( (element) => {
        return element.id === parseInt(req.params.id);
    })
    //return resp.send(course_found);
    if(!course_found){
        resp.status(404).send('The course with the given id was not found');
        return;
    }
    const {error} = validateCourse(req.body);
    //console.log(result);
    if(error){
        resp.status(400).send(error.details[0].message);
        return;
    } //404 error
    course_found.name = req.body.name;
    resp.send(course_found);
})
function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}
app.get('/api/posts/:year/:month',(req,resp)=>{
    resp.send(req.query);
});

// PORT -> env. variable
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`on Port ${port}`));
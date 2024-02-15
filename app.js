const express = require('express');
const { students }  =  require('./student_details/students');
// const loggerMiddleware = require('./middleware/middleware')


const app = express();
const port = process.env.PORT || 3002

// middleware
app.use(express.json());


// customise middleware
//   app.use(loggerMiddleware);

//   console.log(students)

// fetch all courses
app.get('/api/students', (req, res) => {
   res.send(students)
})

app.get('/api/students/:id', (req, res) => {
    const studentId = Number(req.params.id);

    const student = students.find((student) => student.id === studentId );

    if (!student) {
        res.status(404).send(`the student with this id is not completed`)
    }
    
    // else if (!student) {
    //     res.status(300).send(`the ${student} with this id is completed`)
    // }

    res.send(student)
})

// update a course
app.put('/api/students/:id', (req, res) => {
    const studentId = Number(req.params.id);

    const student = students.find((student) => student.id === studentId );

    if (!student) {
        res.status(404).send(`the student with this id is not completed`)
    }

    // else if (!student) {
    //     res.status(300).send(`the ${student} with this id is completed`)
    // }
    student.name = req.body.name

    res.send(student)
})

// delete a course
app.delete('/api/students/:id', (req, res) => {
    // console.log(req.params.id)

    const studentId = Number(req.params.id);

    const student = students.find((student) => student.id === studentId);

    if (!student) {
        res.status(404).send(`the student with this id is not completed`)
    }


    const index = students.indexOf(student)


    console.log(index)

    courses.splice(index, 1)

    res.send(student)

})









// app.listen(port, () => console.log(`Server is running on ${port}`));
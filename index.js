const express = require("express");
// const {students} = require('./student_details/students');
const loggerMiddleware = require("./middleware/middleware");

// const path = require("path");

// express app
const server = express();

// connect to mongodb
const dbURL = 'mongodb+srv://dev-user:asomdwoe.com100@cluster0.s56xn.mongodb.net/?retryWrites=true&w=majority';


 
const port = process.env.PORT || 2222;

// middleware
server.use(express.json());

// customise middleware
server.use(loggerMiddleware);

let students = [];

server.post("/api/v1/student", (req, res) => {
    const student = {
        id: students.length + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isCompleted: req.body.isCompleted,
    };

    if (
        !req.body.firstName === "" ||
        !req.body.lastName === "" ||
        !req.body.isCompleted === ""
    ) {
        return res.status(400).send("please all fills are fields are required");
    }

    students.push(student);
    res.status(201).send(student);
});

// fetching data
server.get("/api/v1/students", (req, res) => {
    // query selector
    const { name } = req.query;

    if (name) {
        const query = students.filter((x) => {
            return x.firstName === name;
        });

        return res.send(query);
    } else {
        return res.send(students);
    }

    //    res.send(students)
    //     console.log(students)
});

server.get("/api/v1/students/:id", (req, res) => {
    const { id } = req.params;

    const student = students.find((student) => student.id === +id);

    if (!student)
        return res.status(404).json({ msg: "please student not found" });

    res.send(student);
});

server.put("/api/v1/students/:id", (req, res) => {
    const { id } = req.params;

    const student = students.find((student) => student.id === +id);

    if (!student)
        return res.status(404).json({ msg: "please student not found" });

       student.firstName = req.body.firstName,
        student.lastName = req.body.lastName,
        student.isCompleted = req.body.isCompleted;

    res.send(student);
});

//delete
server.delete("/api/v1/students/:id", (req, res) => {
    const { id } = req.params;

    const student = students.find((student) => student.id === +id);

    if (!student)
        return res.status(404).json({ msg: "please student not found" });

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(student);
});



server.listen(port, () => console.log(`server is reading on ${port}`));

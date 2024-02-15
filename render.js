const express = require("express");
const mongoose = require("mongoose");
// const BlogModel = require('./models/blogModel');
const blogRoutes = require('./routes/blogRoutes');
const morgan = require("morgan");

const app = express();



const port = process.env.PORT || 3003;

// const list = [
//     'Tomato', 'Mango', 'Pearl'
// ]
// for(let i = 0; i < list.length; i++) {
//     console.log(list[i])
// }

// middleware
app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
// app.set('views', 'pages')

// public folder EJS
app.use(express.static("public"));

// how to render html file in express
console.log(__dirname);

app.use('/blogs', blogRoutes);


app.get('/', (req, res) => {
  res.redirect('/blogs')
})

let blogs = [
  // {
  //     title: 'Good day',
  //     description: 'Today is a good day'
  // },
  // {
  //     title: 'Holiday tomorrow',
  //     description: 'Yet another'
  // },
  // {
  //     title: 'Nice day',
  //     description: 'Today is a good day'
  // }
];
//  console.log(blogs[i].title, blogs[2].description)

// connect to mongoose
// const mongoUrl = 'mongodb+srv://dev-user:asomdwoe.com100@cluster0.s56xn.mongodb.net/blog_template?retryWrites=true'

const mongoUrl = "mongodb://127.0.0.1:27017/blog_template";

//connect mongoose to the express server
mongoose
  .connect(mongoUrl)
  .then((result) => {
    if (result) console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });





app.get("/about", (req, res) => {
  // using the sendFile function to render html file
  // res.sendFile('./views/about.html', { root: __dirname });

  res.render("about", { title: "The about page" });
});


app.get("/");

app.get("/about-us", (req, res) => {
  // using the sendFile function to render html file
  res.redirect("about");
});

// app.get('/index', (req, res) => {
//     // res.render(__dirname + '/index.html')
//    res.render('index')

// })





// catch all
app.use((req, res) => {
  // res.render(__dirname + '/views/404.html')
  res.status(404).render("404", { title: "Page not found" });
});

app.listen(port, (req, res) => console.log(`server is running on port ${port}`));

// partials

// static files they are files which don't change eg logo etc

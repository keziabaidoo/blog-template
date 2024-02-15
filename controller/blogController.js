const express = require("express");
const Blog = require("./../models/blogModel");
const blogController = require("./../controller/blogController");



// getting all blogs in the blogController
const getAllBlogs = async (req, res) => {
  try {
    const results = await Blog.find();

    res.render("home", { title: "Home", blogs: results });
  } catch (error) {
    console.log(error);
  }

  // using the sendFile function to render html file
  // res.sendFile('./views/home.html', { root: __dirname });

  // res.render('home', {title: 'Home', blogs})
};



// posting in blogController
const addBlog = async (req, res) => {
  const { title, description, body } = req.body;

  const blog = new Blog({
    title,
    description,
    body,
  });

  try {
    const result = await blog.save();
    if (result) res.redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
};


// fetching by an id in the controllerBlog
const fetchBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Blog.findById(id);

    // console.log(results)

    if (results) {
      res.render("details", { title: "Blog Details", blog: results });
    }

    // if (results) res.status(404).send(results);
  } catch (error) {
    res.status(500).send(error);
  }

  // using the sendFile function to render html file
  // res.sendFile('./views/home.html', { root: __dirname });

  // res.render('home', {title: 'Home', blogs})
};



// direct you to a page to create a new blog
const createBlog = (req, res) => {
  // using the sendFile function to render html file
  // res.sendFile(__dirname + '/views/gallery.html');

  res.render("create", { title: "Create a blog"});
};


// deleting a blog using an id in the controllerBlog
const deleteBlog = async (req, res) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);

    if (result) res.status(200).json({ msg: "Delete success", redirect: "/" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  fetchBlog,
  createBlog,
  deleteBlog,
};

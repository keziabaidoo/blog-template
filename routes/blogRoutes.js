const express = require("express");
const Blog = require("../models/blogModel");
const blogController = require("./../controller/blogController");

const router = express.Router();

router.get("/", blogController.getAllBlogs);

router.post("/", blogController.addBlog);

router.get("/create", blogController.createBlog);

router.get("/:id", blogController.fetchBlog);

// delete data from blogs
router.delete("/:id", blogController.deleteBlog);

module.exports = router;

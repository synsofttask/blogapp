const express = require("express");
const blogRouter = express.Router();
const { getblogs,addBlog } = require("../../Controller/BlogController/blogcontroller");
const middleware = require("../../Middleware/middleware")

blogRouter.get("/get/blog/:id", getblogs);
blogRouter.post("/post/blog",addBlog)

module.exports = blogRouter;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category_id: "",
    blog_image_url: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return console.error("Token not found in localStorage");

        const decodedToken = jwtDecode(token);
        const authorId = decodedToken.userId || decodedToken.id || decodedToken.sub;
        if (!authorId) return console.error("User ID not found in token");

        const response = await axios.get(`http://localhost:5300/get/blog/${authorId}`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);


  const openModal = async () => {
    try {
      const response = await axios.get("http://localhost:5300/post/blog");
      if (response.status === 200) {
        setNewBlog(response.data);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setIsModalOpen(true);
    }
  };

  const handleAddBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You need to log in!");

      const decodedToken = jwtDecode(token);
      const authorId = decodedToken.userId || decodedToken.id || decodedToken.sub;

      const response = await axios.post(
        "http://localhost:5300/post/blog",
        { author_id: authorId, ...newBlog },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setBlogs([...blogs, response.data]);
        setIsModalOpen(false);
        setNewBlog({ title: "", content: "", category_id: "", blog_image_url: "" });
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 left-0 z-50">
        <h1 className="text-2xl font-bold text-gray-800">Logo</h1>
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700">
            Log In
          </button>
        </Link>
      </nav>


      <div className="relative w-full h-[400px] bg-gray-800 text-white flex flex-col justify-center items-center mt-16">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          alt="Blog Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">Explore the Latest Blogs</h1>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Blogs</h2>


        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700"
        >
          Add a Blog
        </button>


        {blogs.length === 0 ? (
          <p className="text-gray-600 text-center">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto max-h-[500px] p-2">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={blog.blog_image_url}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm">Category ID: {blog.category_id}</p>
                <p className="text-gray-700 mt-2">{blog.content.substring(0, 100)}...</p>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-600 font-semibold hover:underline mt-2 block"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add a New Blog</h2>
            <input
              type="text"
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Category ID"
              value={newBlog.category_id}
              onChange={(e) => setNewBlog({ ...newBlog, category_id: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newBlog.blog_image_url}
              onChange={(e) => setNewBlog({ ...newBlog, blog_image_url: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              placeholder="Content"
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBlog}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;

















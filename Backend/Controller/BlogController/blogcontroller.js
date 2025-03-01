const connection = require("../../Modal/dbconnect");

const getblogs = (req, res) => {
    const { id } = req.params; 
    const query = `
        SELECT blogs.id, blogs.title, blogs.blog_image_url, categories.category_name, 
               blogs.content, blogs.created_at 
        FROM blogs
        JOIN categories ON blogs.category_id = categories.id
        WHERE blogs.author_id = ? 
        ORDER BY blogs.created_at DESC
    `;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error fetching blogs:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "No blogs found for this user." });
        }
        res.status(200).json(results);
    });
};

const addBlog = (req, res) => {
    const { title, content, author_id, category_id, blog_image_url } = req.body;
    if (!title || !content || !author_id || !category_id || !blog_image_url) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = `
        INSERT INTO blogs (title, content, author_id, category_id, blog_image_url, created_at) 
        VALUES (?, ?, ?, ?, ?, NOW())
    `;
    connection.query(query, [title, content, author_id, category_id, blog_image_url], (err, results) => {
        if (err) {
            console.error("Error adding blog:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ message: "Blog added successfully", blogId: results.insertId });
    });
};

module.exports = { getblogs ,addBlog};



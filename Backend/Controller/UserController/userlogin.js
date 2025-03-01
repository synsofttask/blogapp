const connection = require("../../Modal/dbconnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const userRegister = async (req, res) => {
    try {
      const { fullname, email, number, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const Sqlquery = "INSERT INTO users (fullname, email, password, number) VALUES ( ?, ?, ?, ?)";
      connection.query(Sqlquery, [fullname, email, hashedPassword, number], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  };


  const userLogin = (req, res) => {
    const { email, password } = req.body;
    const sqlQuery = "SELECT id, password FROM users WHERE email = ?";
    connection.query(sqlQuery, [email], async (error, result) => {
        if (error) {
            return res.status(500).json({ message: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const { id, password: hashedPassword } = result[0];
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id }, "your_secret_key", { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "Lax",
            maxAge: 60 * 60 * 1000, 
        });
        res.status(200).json({ message: "Login successful", token });
    });
};



module.exports={userLogin,userRegister}
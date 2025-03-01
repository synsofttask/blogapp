import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "", 
    number: "",  
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5300/api/register", {
        fullname: formData.fullname,
        number: formData.number,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration Response:", res.data);
      setSuccess("User registered successfully!");
      setError("");
      setFormData({
        fullname: "",
        number: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/")
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 md:flex-row-reverse p-4">
      <div className="w-full md:w-1/2 md:mx-6 md:my-4">
        <img
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
          alt="Sign Up"
          className="object-cover w-full h-56 md:h-[90vh] rounded-lg"
        />
      </div>

      <div className="w-full p-4 md:p-8 space-y-6 bg-white rounded-lg shadow-lg md:w-1/2">
        <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
        <p className="text-sm text-gray-600">Join the conversation. Sign up to share and explore insightful blogs.</p>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="tel"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />

          <button type="submit" className="w-full py-2 text-white bg-purple-600 rounded-full hover:bg-purple-700">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-purple-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;







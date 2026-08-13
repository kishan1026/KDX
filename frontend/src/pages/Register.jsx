import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      email,
      password,
      confirmPassword,
    } = formData;

    // Validation
    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setSubmitting(true);

      const { data } = await api.post("/users/register", {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      toast.success(
        data.message || "Account created successfully"
      );

      // Go to login after successful registration
      navigate("/login");

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md bg-[#111] border border-zinc-800 rounded-3xl p-10"
      >

        <h1 className="text-4xl font-bold text-white text-center">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mt-3">
          Join KDX and start shopping.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            disabled={submitting}
            autoComplete="username"
            className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none disabled:opacity-50"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={submitting}
            autoComplete="email"
            className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none disabled:opacity-50"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={submitting}
            autoComplete="new-password"
            className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none disabled:opacity-50"
          />

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={submitting}
            autoComplete="new-password"
            className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none disabled:opacity-50"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?

          <Link
            to="/login"
            className="text-yellow-400 ml-2"
          >
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}

export default Register;
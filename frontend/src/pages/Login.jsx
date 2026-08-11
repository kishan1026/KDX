import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { checkAuth } = useAuth();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
            const { data } = await api.post("/users/login", formData);

            toast.success(data.message);
            
            // Update Auth Context
            await checkAuth();
            
            // Redirect to Home
            navigate("/");
      
        } catch (error) {
          console.log(error);
      
          toast.error(
            error.response?.data?.message || "Login Failed"
          );
        }
      };

    return (

        <div className="min-h-screen bg-black flex justify-center items-center px-6">

            <div className="w-full max-w-md bg-[#111] p-10 rounded-3xl border border-zinc-800">

                <h1 className="text-4xl font-bold text-white text-center">

                    Welcome Back

                </h1>

                <p className="text-gray-400 text-center mt-3">

                    Login to your KDX account

                </p>

                <form 
                  onSubmit={handleSubmit}
                className="mt-10 space-y-6">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none focus:border-yellow-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white outline-none focus:border-yellow-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-semibold transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-gray-400 text-center mt-8">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-yellow-500 ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Login;
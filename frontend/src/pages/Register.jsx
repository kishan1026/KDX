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
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            return toast.error("Please fill all fields");

        }

        if (formData.password !== formData.confirmPassword) {

            return toast.error("Passwords do not match");

        }

        try {

            setLoading(true);

            const { data } = await api.post("/users/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            toast.success(data.message);

            navigate("/login");

        }

        catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-black flex items-center justify-center px-6">

            <motion.div

                initial={{ opacity: 0, y: 40 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: .5 }}

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

                    <input

                        type="text"

                        name="username"

                        placeholder="Username"

                        value={formData.username}

                        onChange={handleChange}

                        className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none"

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={formData.email}

                        onChange={handleChange}

                        className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={formData.password}

                        onChange={handleChange}

                        className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none"

                    />

                    <input

                        type="password"

                        name="confirmPassword"

                        placeholder="Confirm Password"

                        value={formData.confirmPassword}

                        onChange={handleChange}

                        className="w-full bg-black border border-zinc-700 rounded-xl p-4 text-white focus:border-yellow-500 outline-none"

                    />

                    <button

                        disabled={loading}

                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl font-semibold transition"

                    >

                        {

                            loading ?

                                "Creating Account..."

                                :

                                "Create Account"

                        }

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
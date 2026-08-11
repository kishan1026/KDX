import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, Heart, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Profile() {

    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        fetchUser();

    }, []);

    const fetchUser = async () => {

        try {

            const { data } = await api.get("/users/current-user");

            setUser(data.user);

        }

        catch (error) {

            console.log(error);

        }

    };

    const logout = async () => {

        try {

            await api.post("/users/logout");

            toast.success("Logged Out");

            navigate("/login");

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!user) {

        return (

            <div className="min-h-screen bg-black flex justify-center items-center text-yellow-500">

                Loading...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-black text-white py-20">

            <div className="max-w-xl mx-auto">

                <motion.div

                    initial={{ opacity: 0, y: 30 }}

                    animate={{ opacity: 1, y: 0 }}

                    className="bg-[#111] rounded-3xl border border-zinc-800 p-10"

                >

                    <div className="flex justify-center">

                        <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center">

                            <User
                                size={50}
                                className="text-black"
                            />

                        </div>

                    </div>

                    <h1 className="text-center text-4xl font-bold mt-8">

                        {user.username}

                    </h1>

                    <p className="text-center text-gray-500 mt-3">

                        {user.email}

                    </p>

                    <div className="mt-12 space-y-5">

                        <Link

                            to="/my-orders"

                            className="flex justify-between items-center bg-black rounded-xl p-5 hover:border-yellow-500 border border-zinc-800"

                        >

                            <span className="flex gap-3">

                                <Package />

                                My Orders

                            </span>

                            →

                        </Link>

                        <Link

                            to="/wishlist"

                            className="flex justify-between items-center bg-black rounded-xl p-5 hover:border-yellow-500 border border-zinc-800"

                        >

                            <span className="flex gap-3">

                                <Heart />

                                Wishlist

                            </span>

                            →

                        </Link>

                        <button

                            onClick={logout}

                            className="w-full bg-red-600 hover:bg-red-500 py-4 rounded-xl flex justify-center gap-3"

                        >

                            <LogOut />

                            Logout

                        </button>

                    </div>

                </motion.div>

            </div>

        </div>

    );

}

export default Profile;
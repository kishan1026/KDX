import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {

    return (

        <div className="min-h-screen bg-black flex justify-center items-center px-6">

            <motion.div

                initial={{
                    opacity:0,
                    scale:.8
                }}

                animate={{
                    opacity:1,
                    scale:1
                }}

                className="bg-[#111] rounded-3xl p-12 text-center border border-zinc-800"

            >

                <CheckCircle

                    className="text-green-500 mx-auto"

                    size={90}

                />

                <h1 className="text-white text-5xl font-bold mt-8">

                    Order Placed!

                </h1>

                <p className="text-gray-400 mt-6">

                    Thank you for shopping with KDX.

                </p>

                <Link

                    to="/orders"

                    className="inline-block mt-10 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full"

                >

                    View Orders

                </Link>

            </motion.div>

        </div>

    );

}

export default OrderSuccess;
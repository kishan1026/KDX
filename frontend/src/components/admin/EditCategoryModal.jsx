import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import toast from "react-hot-toast";

function EditCategoryModal({
    open,
    onClose,
    category,
    onCategoryUpdated
}) {

    const [name, setName] = useState("");

    useEffect(() => {

        if(category){

            setName(category.name);

        }

    },[category]);

    if(!open) return null;

    const handleSubmit = async()=>{

        try{

            const {data}=await api.put(

                `/categories/${category._id}`,

                {name}

            );

            toast.success(data.message);

            onCategoryUpdated();

            onClose();

        }

        catch(error){

            toast.error(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    }

    return(

        <AnimatePresence>

            <motion.div

                className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"

                initial={{opacity:0}}

                animate={{opacity:1}}

                exit={{opacity:0}}

            >

                <motion.div

                    className="bg-[#111] w-125 rounded-3xl border border-zinc-800 p-8"

                    initial={{scale:0.9}}

                    animate={{scale:1}}

                >

                    <div className="flex justify-between mb-8">

                        <h2 className="text-3xl font-bold">

                            Edit Category

                        </h2>

                        <button onClick={onClose}>

                            <X/>

                        </button>

                    </div>

                    <input

                        value={name}

                        onChange={(e)=>setName(e.target.value)}

                        className="w-full bg-black border border-zinc-700 rounded-xl p-4"

                    />

                    <button

                        onClick={handleSubmit}

                        className="w-full mt-6 bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-xl"

                    >

                        Save Changes

                    </button>

                </motion.div>

            </motion.div>

        </AnimatePresence>

    )

}

export default EditCategoryModal;
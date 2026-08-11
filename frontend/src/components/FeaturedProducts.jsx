import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import api from "../services/api";
import ProductCard from "./ProductCard";

function FeaturedProducts() {

    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        const fetchProducts=async()=>{

            try{

                const {data}=await api.get("/products");

                setProducts(data.products);

            }

            catch(error){

                console.log(error);

            }

            finally{

                setLoading(false);

            }

        }

        fetchProducts();

    },[])

    return(

        <section className="bg-black py-24">

            <div className="max-w-7xl mx-auto px-6">

                <motion.div

                initial={{
                    opacity:0,
                    y:40
                }}

                whileInView={{
                    opacity:1,
                    y:0
                }}

                viewport={{
                    once:true
                }}

                >

                    <h2 className="text-center text-yellow-500 tracking-[8px] uppercase">
                        Premium Collection
                    </h2>

                    <h1 className="text-center text-white text-5xl font-bold mt-5">

                        Featured Products

                    </h1>

                    <p className="text-center text-gray-400 mt-5 max-w-xl mx-auto">

                        Explore our handpicked luxury collection made for people
                        who appreciate premium quality.

                    </p>

                </motion.div>

                {
                    loading ?

                    (

                        <div className="text-center text-yellow-500 mt-20">

                            Loading Products...

                        </div>

                    )

                    :

                    (

                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-20">

                            {

                                products.map((product)=>(

                                    <ProductCard

                                    key={product._id}

                                    product={product}

                                    />

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </section>

    )

}

export default FeaturedProducts;
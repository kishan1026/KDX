import mongoose from "mongoose";
import Product from "../models/products.models.js";
import { Category } from "../models/category.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            stock,
            category
        } = req.body;


        console.log("Body:", req.body);
        console.log("File:", req.file);

        // Validation
        if (
            !name?.trim() ||
            !description?.trim() ||
            price == null ||
            !category
        ) {
            return res.status(400).json({
                message: "All required fields are mandatory"
            });
        }

        // Check if category exists
        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Get local file path from multer
        const localFilePath = req.file?.path;

        if (!localFilePath) {
            return res.status(400).json({
                message: "Product image is required"
            });
        }

        // Upload image to Cloudinary
        const uploadedImage = await uploadOnCloudinary(localFilePath);

        if (!uploadedImage) {
            return res.status(500).json({
                message: "Image upload failed"
            });
        }

        // Create product
        const product = await Product.create({
            name,
            description,
            price,
            stock,
            category,
            productImage: {
                url: uploadedImage.secure_url,
                public_id: uploadedImage.public_id
            },
            owner: req.user._id
        });

        // Populate category and owner
        const createdProduct = await Product.findById(product._id)
            .populate("category", "name")
            .populate("owner", "username email");

        return res.status(201).json({
            message: "Product created successfully",
            product: createdProduct
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
   

const getAllProducts = async (req, res) => {
    try {
        const {
            search,
            category,
            page = 1,
            limit = 12
        } = req.query;

        const filter = {};

        // Search
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Category filter
        if (category) {
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({
                    message: "Invalid category ID"
                });
            }

            filter.category = category;
        }

        const pageNumber = Math.max(Number(page), 1);
        const limitNumber = Math.min(Math.max(Number(limit), 1), 50);
        const skip = (pageNumber - 1) * limitNumber;

        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
                .select("name description price stock category productImage")
                .populate("category", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber)
                .lean(),

            Product.countDocuments(filter)
        ]);

        return res.status(200).json({
            message: "Products fetched successfully",
            products,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalProducts / limitNumber),
                totalProducts,
                limit: limitNumber
            }
        });

    } catch (error) {
        console.error("Get Products Error:", error);

        return res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};
const getProductById = async(req,res)=>{
    try{
        const {id} =req.params;



         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findById(id)
                  .populate("category", "name")
                  .populate("owner", "username email");
          
        if(!product){
            return res.status(404).json({
                message:"product not found"
            });
        }

        
        return res.status(200).json({
            message: "Product fetched successfully",
            product
        });


    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }

}

const updateProduct = async (req,res)=>{
    try{
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const {
            name,
            description,
            price,
            stock,
            category,
            
        } = req.body;
 
        if (category) {
            const existingCategory = await Category.findById(category);

            if (!existingCategory) {
                return res.status(404).json({
                    message: "Category not found"
                });
            }
        }

        const product = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                stock,
                category,
                
            },
            {
               returnDocument: "after"
            }
        )
        .populate("category", "name")
        .populate("owner", "username email");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product
        });



    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

const deleteProduct =async (req,res)=>{
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export { createProduct,getAllProducts,getProductById,updateProduct,deleteProduct};
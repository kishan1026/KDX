import { Category } from "../models/category.model.js";
import mongoose from "mongoose";


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name?.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(409).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({
            name
        });

        return res.status(201).json({
            message: "Category created successfully",
            category
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
    

export const getAllCategories = async (req, res) => {

    try {
        const categories = await Category.find();

        return res.status(200).json({
            message: "Categories fetched successfully",
            categories
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}
export const getCategoryById = async (req, res) => {
    try{
        const {id}= req.params

         // Validate ObjectId
         if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid category ID"
            });
        }
        const category = await Category.findById(id)

        if(!category){
            return res.status(404).json({
                message:"category not found"
            });
        }

        return res.status(200).json({
            message: "Category fetched successfully",
            category
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateCategory = async (req, res) => {
    try {
        // Get the category ID from the URL
        const { id } = req.params;

        // Get the new category name from the request body
        const { name } = req.body;

        // Validate input
        if (!name?.trim()) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        // Update the category
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name },
            { returnDocument: "after"}
        );

        // Check if category exists
        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Send success response
        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};


export const  deleteCategory = async (req, res) => {

    try{

    const {id}= req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid category ID"
        });
    }
     
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    return res.status(200).json({
        message: "Category deleted successfully"
    });

}catch(error){
    return res.status(500).json({
        message:error.message
    })

}


    
}
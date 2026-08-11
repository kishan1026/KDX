import cloudinary from "../db/cloudinary.js";
import fs from 'fs';

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log('file is uploaded on cloudinary',response.url);
        

        return response;

    } catch (error) {

        fs.unlinkSync(localFilePath)
        console.log(error);
        return null;
    }
};

export default uploadOnCloudinary;
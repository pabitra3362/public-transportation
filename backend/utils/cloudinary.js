import {v2 as cloudinary} from 'cloudinary';
import config from '../config/config.js';
import fs from 'fs';



// Cloudinary configuration
cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.cloudAPIKey,
    api_secret: config.cloudSecret,
});


export const cloudinaryUpload = async (fileObject) => {
    if(!fileObject) return null;

    try {
        // Upload file to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(fileObject.path, {
            resource_type: 'auto'
        })

        // Delete file from server storage after upload
        fs.unlinkSync(fileObject.path)
        return uploadResponse.url

    } catch (error) {
        console.log("error while uploading file to cloudinary", error);
        return null;
        
    }
}
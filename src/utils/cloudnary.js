import {v2 as cloudinary} from "cloudinary"
import {fs} from "fs" // file read write remove etc.

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        const res = await cloudinary.uploader.upload
        (localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary",red.url);
        return res;
    } catch(err){
        fs.unlinkSync(localFilePath) // remove the local saved temp file as the upload opration got failed
        return null;
    }
}

export {uploadOnCloudinary}
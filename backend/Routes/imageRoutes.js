import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import Image from "../Model/ImageModel.js";

const imageRoute = Router();

imageRoute.post('/upload', async (req, res) => {
    try {
        const { image, title } = req.body;
        console.log(image, title);

        if (!image) {
            return res.status(400).json({ error: "Image not Found. Image is required" });
        }

        const result = await cloudinary.uploader.upload(image);
        console.log("Upload Result: ", result);

        const newImage = new Image({
            title,
            imageUrl: result.secure_url,
            publicID: result.public_id
        });

        await newImage.save();
        res.status(200).json({ message: "Image Uploaded Successfully" });
    } catch (error) {
        console.error("Error uploading image: ", error);
        res.status(500).json({ error: `Error uploading image: ${error.message}` });
    }
});

imageRoute.get('/allimages', async (req, res) => {
    try {
        const Allimages = await Image.find();

         if (!Allimages){
            return res.status(400).json({ error: "No Images Found" });
         }

         res.status(200).json({Allimages})

    } catch(error) {
        res.status(500).json({error: `Error ${error.message}`})
    }
})

imageRoute.put('/image/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const { newTitle } = req.body;

        const updatedImage = await Image.findByIdAndUpdate(id, {title: newTitle }, {new: true});

        if(updatedImage === null){
            return res.status(400).json({error: "Image not found" })
        }
        res.status(200).json({message: "Image Updated Successfully"})

    } catch{
        res.status(500).json({error: `Error ${error.message}`})
    }
})

export default imageRoute;

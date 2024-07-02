import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import Image from "../../Model/ImageModel.js";

const imageRoute = Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: upload a new Image
 *     tags: {images}
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: image
 *             properties:
 *               image:
 *                 type: string
 *               title:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Image was Successfully Uploaded
 *       400:
 *         description: Image not found. Image is required
 *       500:
 *         description: Error uploading image.
 */

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


/**
 * @swagger
 * /api/allimages:
 *   get:
 *     summary: Get all Images
 *     tags: {images}
 *     responses:
 *       200:
 *         description: Image Fetched Succefully
 *       400:
 *         description: No Images Found
 *       500:
 *         description: Error fetching image.
 */


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

/**
 * @swagger
* /api/image/{id}:
*   put:
*     summary: Update Image Title
*     tags: {images}
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: Image Id
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: image
*             properties:
*               newTitle:
*                 type: string 
*     responses:
*       200:
*         description: Image was Successfully Updated.
*       400:
*         description: Image not found.
*       500:
*         description: Error updating image.
*/
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
});

imageRoute.delete('/image/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const deletedImage = await Image.findByIdAndDelete(id);
        if(deletedImage === null){
            return res.status(400).json({error: "Image not found" });
        }

        await cloudinary.uploader.destroy(deletedImage.publicID);

        res.status(200).json({message: "Image Deleted Successfully"});
    } catch(error){
            res.status(500).json({error: `Error ${error.message}`});
    }
})

export default imageRoute;

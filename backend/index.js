import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser'

import imageRoute from './Routes/imageRoutes.js'; 

    
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));

dotenv.config();

console.log('MONGODB_URL:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);

app.use(morgan("dev"));
app.use(cors());

const URI = process.env.MONGODB_URI;

console.log('MongoDB URI:', URI);

if (URI) {
    mongoose
        .connect(URI)
        .then(() => {
            console.log('Connected to Mongo!');
        })
        .catch((err) => {
            console.error('Error connecting to Mongo', err);
        });
} else {
    console.error('MongoDB URI is not defined. Please check your .env file.');
}

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_SECRET)


app.get("/", (req, res) => {
    res.json("Working");
});

app.use("/api", imageRoute);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
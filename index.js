import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import bodyParser from 'body-parser'

import imageRoute from './src/Routes/imageRoute.js'; 

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.css";
    
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


// swagger options
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Photo Sharing App API',
        description: "API endpoints for a photo sharing app documented on swagger",
        version: '1.0.0',
      },
      servers: [
        {
          url: "http://localhost:4000/",
          description: "Local server"
        },
        {
          url: "https://backend-sigma-dun.vercel.app",
          description: "Live server"
        },
      ]
    },
    apis: ['./src/**/*.js'],
  }
  const swaggerSpec = swaggerJsdoc(options);
    
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('/api-docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
})

app.get("/", (req, res) => {
    res.json("Working");
});

app.use("/api", imageRoute);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
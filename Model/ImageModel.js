import mongoose from "mongoose";

const { Schema } = mongoose;

const ImageSchema = new Schema({
    imageUrl: String,
    title: String,
    publicID: String,
});

const Image = mongoose.model('ImageCollection', ImageSchema);

export default Image;
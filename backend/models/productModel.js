import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    _id: String,
    name: String,
    price: Number
});

export const Product = mongoose.model('Product',productSchema);
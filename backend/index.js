import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { PORT , mongodbURL } from './config.js';
import { Product } from './models/productModel.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello there')
})

app.get('/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        return res.status(200).send(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.get('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const book = await Product.findById(id);
        return res.status(200).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.post('/products',async(req,res)=>{
    try {
        if(req.body._id&&req.body.name&&req.body.price){
            const newProduct = {
                _id: req.body._id,
                name: req.body.name,
                price: req.body.price
            }
            const product = await Product.create(newProduct);
            return res.status(201).send(product);
        }
        else{
            return res.status(400).send('enter all details: _id, name, price');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.put('/products/:id',async(req,res)=>{
    try {
        if(req.body._id&&req.body.name&&req.body.price){
            const newProduct = {
                _id: req.body._id,
                name: req.body.name,
                price: req.body.price
            }
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate(id,newProduct);
            if(!product){
                return res.status(404).send('no item found with this id');
            }
            return res.status(200).send(product);
        }
        else{
            return res.status(400).send('enter all details: _id, name, price');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
})

app.delete('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Product.findByIdAndDelete(id);
        if(!result) {
            return res.status(404).send('no item found with this id');
        }
        return res.status(200).send('deleted successfully');
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

mongoose
    .connect(mongodbURL)
    .then(()=>{
        console.log('connected to the database...');
        app.listen(PORT,()=>{
            console.log(`server is listening on port ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log('An error occured: ',error);
    })


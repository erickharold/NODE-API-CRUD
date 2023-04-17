const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
require('dotenv').config()

const app = express();
const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;

app.use(express.json())

app.listen(PORT, () => {
    console.log('Server noe');
});

app.post('/product', async (req, res) => {
    try 
    {
        const product = await Product.create(req.body)
        res.status(200)
            .json(product)

    } 
    catch (error)
    {
        res.status(500)
            .json({message: error.message})    
    }
})

app.get('/', (req, res) => {
    res.send('Hello from HOME UNI');
}); 

app.put('/product/:id', async (req, res) => {
    try 
    {
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, req.body)

        if(!product)
        {
            return res.status(404)
                        .json({message: 'No se encontro el ID: ${id}'})
        }

        res.status(200)
            .json(product)

    } 
    catch (error)
    {
        res.status(500)
            .json({message: error.message})    
    }
})

app.delete('/product/:id', async (req, res) => {
    try 
    {
        const {id} = req.params;

        const product = await Product.findByIdAndDelete(id)

        if(!product)
        {
            return res.status(404)
                        .json({message: 'No se encontro el ID: ${id}'})
        }

        res.status(200)
            .json(product)

    } 
    catch (error)
    {
        res.status(500)
            .json({message: error.message})    
    }
})

app.get('/product/:id', async (req, res) => {
    try 
    {
        const {id} = req.params;

        const product = await Product.findById(id)
        res.status(200)
            .json(product)

    } 
    catch (error)
    {
        res.status(500)
            .json({message: error.message})    
    }
})

app.get('/products', async (req, res) => {
    try 
    {
        const product = await Product.find({})
        res.status(200)
            .json(product)

    } 
    catch (error)
    {
        res.status(500)
            .json({message: error.message})    
    }
})

mongoose.connect(URL_CONNECT)
    .then(() => {
        console.log('conectadp a mongo');
    })
    .catch(error => {
        console.log(error);
    })




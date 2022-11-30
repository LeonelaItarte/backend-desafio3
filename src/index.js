const ProductManager = require("./productManager")

const productManager = new ProductManager("productos.txt")

const express = require('express');

const index = express();

index.use(express.urlencoded({ extended: true }));

index.get('/productos',async(req,res)=>{
   
   res.send(await productManager.getAll())
})



index.get('/productoRandom',async(req,res)=>{

    const producto = await productManager.getAll();

    const aleatorio = producto[Math.floor(Math.random() * producto.length)];

    res.send(aleatorio)
})

index.listen(8080,()=>console.log('servidor arriba desde el puerto 8080')); 


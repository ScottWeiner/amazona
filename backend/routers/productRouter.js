import { data } from '../data.js'
import express from 'express'
import { ProductModel } from '../models/ProductModel.js'
import expressAsyncHandler from 'express-async-handler'


const productRouter = express.Router()

productRouter.get("/", expressAsyncHandler(async (req, res) => {

    const products = await ProductModel.find({})
    res.send(products)
}))



productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdProducts = await ProductModel.insertMany(data.products)
    res.send({ createdProducts })
}))


productRouter.get("/:id", expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id)

    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found!' })
    }
}))


export default productRouter
import express from 'express'
import mongoose from 'mongoose'

import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import dotenv from 'dotenv'



const envConfig = dotenv
envConfig.config()
//console.log(process.env.MONGODB_URL)


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URL, {})


app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) => {
    res.send('Server is read')
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log("listening on port 3001")
})
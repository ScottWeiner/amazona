import express from 'express'
import { data } from './data.js'

const app = express()

app.get("/api/products", (req, res) => {
    console.log(data)
    res.send(data.products)
})

app.get('/', (req, res) => {
    res.send('Server is read')
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log("listening on port 3001")
})
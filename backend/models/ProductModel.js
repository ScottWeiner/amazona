import mongoose from 'mongoose'



const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true }

}, {
    timestamps: true //adds createdAt & updatedAt fields to the record along with the defined columns above
})

export const ProductModel = mongoose.model("Product", ProductSchema)


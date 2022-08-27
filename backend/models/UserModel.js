import mongoose from 'mongoose'



const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true }
}, {
    timestamps: true //adds createdAt & updatedAt fields to the record along with the defined columns above
})

export const UserModel = mongoose.model("User", UserSchema)


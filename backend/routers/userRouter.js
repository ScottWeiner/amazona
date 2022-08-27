import { data } from '../data.js'
import express from 'express'
import { UserModel } from '../models/UserModel.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utilities/utilities.js';


const userRouter = express.Router()

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await UserModel.insertMany(data.users)
    res.send({ createdUsers })
}))

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if (user) {

        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user) //will implement later
            })
            return
        }
    }
    res.status(401).send({ message: 'Invalid username or password' })
}))

export default userRouter
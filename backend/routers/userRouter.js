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
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({ message: 'Invalid username or password' })
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    if (!req.body.email || !req.body.password || req.body.password.length < 5 || !req.body.name) {
        res.status(500).send({ message: 'name, email or password was empty or not good enough. do something about it, please.' })
        return
    }

    const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: false
    })

    const createdNewUser = await newUser.save()
    res.send({
        _id: createdNewUser._id,
        name: createdNewUser.name,
        email: createdNewUser.email,
        isAdmin: createdNewUser.isAdmin,
        token: generateToken(createdNewUser)
    })


}))

export default userRouter
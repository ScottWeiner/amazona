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

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    console.log('You hit the user/:id route!')
    const user = await UserModel.findById(req.params.id)

    if (!user || !user._id) {
        res.status(404).send({ message: "something is fucked up. Couldn't find that user" })
    } else {

        res.send(user)
    }
}))

userRouter.put('/profile', expressAsyncHandler(async (req, res) => {
    console.log('You hit the user/profile route!')
    console.log('req.user', req.body)
    const user = await UserModel.findById(req.body.userId)
    if (!user || !user._id) {
        res.status(404).send({ message: "something is fucked up. Couldn't find that user" })
    }
    if (user) {
        user.name = req.body.name || user.name,
            user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }
        const updatedUser = await user.save()
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    }
}))

export default userRouter
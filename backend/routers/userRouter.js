import { data } from '../data.js'
import express from 'express'
import { UserModel } from '../models/UserModel.js'
import expressAsyncHandler from 'express-async-handler'


const userRouter = express.Router()

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const createdUsers = await UserModel.insertMany(data.users)
    res.send({ createdUsers })
}))

export default userRouter
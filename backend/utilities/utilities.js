import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export const isAuth = (req, res, next) => {
    //console.log('req.body ', req.body)
    const authorization = req.headers.authorization || req.body.headers.Authorization
    //console.log('authorization: ', authorization)
    if (authorization) {
        const token = authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
            if (error) {
                res.status(401).send({ message: 'Invalid token!' })
            } else {
                req.user = decode;
                next()
            }
        })
    } else {
        res.status(401).send({ message: 'No Token!' })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send({ message: 'Invalid Admin token!!' })
    }
}
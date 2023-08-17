import express from 'express';
import path from 'path'
import jwt from 'jsonwebtoken';

let router = express.Router()

import AuthRouter from './routes/auth.mjs'
import PostRouter from './routes/post.mjs'







//////////////////authentication//////////////////////
router.use(AuthRouter)

////////////////////Checking if the token is valid//////////////////////
router.use((req, res, next) => {

    console.log("here lesg")
    console.log("Cookie :", req.cookies)
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("Decoded :", decoded)
        req.body.decoded = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
        }
        next()
    } catch (err) {
        // err
        console.log(err)
        // res.redirect(path.join(__dirname, 'public'));
        res.status(401).send({ message: "invalid Token" })
    }

})

/////Secure Apis//////
////////////////////////Proceding the person to My Crud-Page////////////////////
router.use(PostRouter)


export default router
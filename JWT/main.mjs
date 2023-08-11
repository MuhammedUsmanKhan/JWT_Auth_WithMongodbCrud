import express from 'express';
let router = express.Router()

import AuthRouter from './routes/auth.mjs'


//////////////////authentication//////////////////////
router.use(AuthRouter)


////////////////////Checking if the token is valid//////////////////////
// router.use((req, res, next) => {
//     const token = "valid"
//     if (token === "valid") {
//         next();
//     } else {
//         res.status(401).send({ message: "invalid token" })
//     }
// })

////////////////////////Proceding the person to homepage////////////////////

export default router
// import { Collection } from 'mongodb'
import { client } from '../../mongodb.mjs'
import { stringToHash, varifyHash } from "bcrypt-inzi"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import express from 'express'

const db = client.db('userInfo')
const col = db.collection('users')

let router = express.Router()


//////////////// Checking User in mongoDb database (Sign In) ///////////////
router.post('/signin', async (req, res, next) => {

  
    if ((req.body?.email.trim().length == 0) || (req.body?.password.trim().length == 0)) {

        res.status(403);
        res.send(`required parameters missing, 
        example request body:
        {
          email: "abc user email"
          password: "abc user password"
        } `);
        return
    }


    req.body.email = req.body.email.toLowerCase()

    try {

        const fetchhuserData = await col.findOne({
            email: req.body.email
        })

        if (!fetchhuserData) {

            res.status(403).send({ message: "email or password incorrect" })

        } else {

            const comparingPass = varifyHash(req.body.password, fetchhuserData.password)

            if (comparingPass) {

                const token = jwt.sign({
                    isAdmin: false,
                    firstName: fetchhuserData.firstName,
                    lastName: fetchhuserData.lastName,
                    email: req.body.email
                }, process.env.SECRET, {
                    expiresIn: '48hr'
                })

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true
                })
                res.send({ message: 'logged in successfully' })
                return
            } else {
                res.status(401).send({ message: "email or password incorrect" })
                return
            }
        }



    } catch (err) {
        console.log(err)
        res.status(500).send('server error please try again', err)
    }


})

//////////////// Adding and User in mongoDb database (Sign Up) ///////////////
router.post('/signup', async (req, res, next) => {

    ///////////////// Validate Info ////////////////////////////////////

    if (
        (req.body?.email.trim().length == 0) || (req.body?.password.trim().length == 0) || (req.body?.firstName.trim().length == 0) || (req.body?.lastName.trim().length == 0)
    ) {
        res.status(403);
        res.send(`required parameters missing, 
    example request body:
    {
        firstName: "abc user first name",
        lastName: "abc user last name"
        email: "abc user email"
        password: "abc user password"

    } `);
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    try {

        const check = await col.findOne({
            email: req.body.email
        })

        if (!check) {
            const passwordHash = await stringToHash(req.body.password);
            const result = await col.insertOne({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: passwordHash,
                createdOn: new Date()
            });
            console.log(
                `A document was inserted with the _id: ${result.insertedId}`,
            );
            res.send({ message: 'Signup successful' });
        }
        else {
            res.status(403).send({
                message: "user already exist with this email"
            });
        }


    } catch (error) {
        console.log(error)
    }


})


//app.get()
export default router
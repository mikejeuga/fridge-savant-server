const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../auth/auth')
const generatePasswordHash = require('../auth/generatePasswordHash')
const { check, validationResult } = require('express-validator');


const User = require('../models/User')

router.get('/', auth, async (req, res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error');
    }
})


router.post('/signup', [
    check('name', 'Your name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valide email').isEmail(),
    check('password', 'Passwords need to have 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {name, username,  email, password } = req.body;

    try {
        let user = await User.findOne({email})

        if(user) {
            return user.status(400).json({msg: 'This user already exists.'})
        }

        user = new User({
            name,
            username,
            email,
            password: await generatePasswordHash(password)
        });

        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, "secret", {
            expiresIn: 3600000
        }, (err, token)=> {
            if(err) throw err;
            res.json({userId: user.id, name: user.name, token: token})
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

});


router.post('/login', [
    check('email', 'Please include a valide email').isEmail(),
    check('password', 'Password is required').exists()],
     async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const {email, password } = req.body;
    try {

        let user = await User.findOne({email})

        if(!user) {
            return user.status(400).json({msg: 'Invalid email.'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return user.status(400).json({msg: 'Invalid password.'})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, "secret", {
            expiresIn: 3600000
        }, (err, token)=> {
            if(err) throw err;
            res.json({userId: user.id, name: user.name, token: token})
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router

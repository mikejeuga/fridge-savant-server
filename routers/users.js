const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const generatePasswordHash = require('../auth/generatePasswordHash')
const { check, validationResult } = require('express-validator');


const User = require('../models/User')


router.post('/', [
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

    const {name, email, password } = req.body;

    try {
        let user = await User.findOne({email})

        if(user) {
            return user.status(400).json({msg: 'This user already exists.'})
        }

        user = new User({
            name,
            email,
            password: await generatePasswordHash(password)
        });

        await user.save()

        res.send(`${user.name} saved`)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server Error')
    }

});




router.get('/', [
    check('email', 'Please include a valide email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
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
        res.send(user)
    } catch (error) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router

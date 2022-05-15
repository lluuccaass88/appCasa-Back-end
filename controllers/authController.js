const express = require('express');

const User = require('../models/user')

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        //verify if user_id Already exists
        console.log("Verifica: " + (await verfyUser_id(req.body.user_id)))
        if(await User.findOne({user_id})){
            return res.status(400).send({ error: 'User already registered'})
        }

        const user = await User.create(req.body); 
        
        console.log("chegou aqui")

        res.user_secret_key = undefined;

        return res.send({ user })
    } catch(err){
        
    }
})

module.exports = app => app.use('/auth', router);
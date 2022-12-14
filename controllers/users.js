const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
    
    const { firstName, lastName, email, password } = request.body;

    const existingUser = await User.findOne({email});

    if(existingUser) {
        
        return response.status(400).json({
            error: "email already in use"
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        firstName, lastName, email, passwordHash
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
})

module.exports = usersRouter;
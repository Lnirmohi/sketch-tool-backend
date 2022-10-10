const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post("/", async (request, response) => {
    
    const { email, password } = request.body;

    const user = await User.findOne({email}).populate('sketches');
    const passwordMatch = user === null 
        ? false 
        : await bcrypt.compare(password, user.passwordHash);

    if(!(user && passwordMatch)) {
        return response.status(401).json({
            error: 'Invalid email or password'
        })
    }

    const userForToken = {
        email: user.email,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
        .status(200)
        .send({
            token, 
            email: user.email, 
            firstName: user.firstName, 
            lastName: user.lastName, 
            sketches: user.sketches
        });
})

module.exports = loginRouter;
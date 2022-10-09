const jwt = require("jsonwebtoken");
const Sketch = require("../models/sketch");
const sketchRouter = require("express").Router();
const User = require("../models/user");

const getTokenFromReq = (request) => {
    const auth = request.get("authorization");

    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7);
    }

    return null;
}

sketchRouter.post("/", async (request, response) => {

    const body = request.body;
    const token = getTokenFromReq(request);
    const decodeToken = jwt.verify(token, process.env.SECRET);

    if(!decodeToken.id) {
        return response(401).json({error: "Token missing or invalid"});
    }

    const user = await User.findById(decodeToken.id);

    const sketch = new Sketch({
        imgData: body.imgData,
        user: user._id
    });

    const savedSketch = await sketch.save();
    user.sketches = user.sketches.concat(savedSketch._id);
    await user.save();

    response.json(savedSketch);
});

module.exports = sketchRouter;
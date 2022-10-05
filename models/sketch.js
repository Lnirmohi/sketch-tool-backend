const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  });

const sketchSchema = new mongoose.Schema({
    name: String,
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
});

sketchSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Sketch', sketchSchema);
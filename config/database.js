require('dotenv').config();
const mongoose = require('mongoose');

async function connectToMongoDB() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log(err);
  });
}


module.exports = {
  connectToMongoDB
};
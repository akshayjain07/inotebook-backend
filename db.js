const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/ajNotebook';
// const mongoURI = 'mongodb://127.0.0.1:27017/iNotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongo;
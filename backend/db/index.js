const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://hassanalimalek9:Hassanali0123@cluster0.m4x43wd.mongodb.net/', {
  }).then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


// Create a user schema
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minLength: 3,
      maxLength: 30
  },
  password: {
      type: String,
      required: true,
      minLength: 6
  },
  firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  },
  lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
  },
})

const accountSchema = new mongoose.Schema({
  userId:{
    ref:'User',
    type:mongoose.Schema.Types.ObjectId,
    required:true
  },
  balance:{
    required:true,
    type:Number,
  }
})

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {User,Account};
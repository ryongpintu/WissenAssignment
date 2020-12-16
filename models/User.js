const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    
  },
  last_name: {
    type: String,
   
  },
  address: {
    type: String,
    
  },
  telephone_number: {
    type: String,
    
  },
  ssn: {
    type: String,
    
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  usertype: {
    type: String
  },
  profile: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);

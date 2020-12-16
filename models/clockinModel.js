const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({

    
  fromTime: {
    type: Date,
   
    
  },



userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
},
   
  

  toTime: {
    type: Date,
   
  
  },
  startDate: {
    type: Date,
   
  },
  totalHours: {
    type: String,
   
  },
  
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Employe_ClockIn = mongoose.model('Employe_ClockIn', UserSchema);

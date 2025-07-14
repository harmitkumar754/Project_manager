const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid: {
      type: Number,
       unique: true
    },
    name: {
        type: String,
    },
    Designation: {
        type: String,
    },
    phone: {
        type: Number, 
    },
    password: {
        type: String,
    },
    jdt:{
        type: String,
    },
  projectid: {
  type: [
    {
      pid: { type: Number, required: true },
      status: { type: String, default: "Not Started" }
    }
  ],
  default: []
}
}, { timestamps: true });

module.exports=mongoose.model('users', userSchema);
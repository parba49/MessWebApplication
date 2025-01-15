const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  
  username:{
    type:String,
    name:true,
  },
  millcount: {
    type: Number,
    required: true,
  },
  bazarcost: {
    type: Number,
    required: true,
  },
  createOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Data", userSchema);
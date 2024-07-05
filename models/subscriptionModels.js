const mongoose = require("mongoose");
const subscriptionSchema = mongoose.Schema(
  {
    subscriptionname: {
      type: String,
      required: [true, "Please enter a name"],
      unique: [true, "already exists"],
    },
    description: {
      type: String,
      required: [true, "Please enter the description of this subscription "],
    },
    price: {
      type: String,
      required: [true, "Please enter the price"],
    },
    duration: {
      type: Number,
      required: [true, "Please enter the duration of this sub in days "],
    },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subscription", subscriptionSchema);

const mongoose = require("mongoose");
const traineeSchema = mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a name"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter a phone number"],
    },
    subscriptionType:
    {
        type : String,
        required: [true, "Please enter a subscription type"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("trainee", traineeSchema);

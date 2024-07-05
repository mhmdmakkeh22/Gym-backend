const mongoose = require('mongoose');

// Define the Payment schema
const paymentSchema = mongoose.Schema(
  {
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainee',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true,
      default: 'USD'
    },
    paymentMethod: {
      type: String,
      required: true, 
    },
    
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Failed', 'Cancelled'],
      default: 'Pending'
    }
   
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);

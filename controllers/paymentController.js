const asyncHandler = require('express-async-handler');
const Payment = require('../models/paymentModel');
const Trainee = require('../models/traineeModel');


const addPayment = asyncHandler(async (req, res) => {
    const { payerId, amount, currency, paymentMethod, status } = req.body;
  
    // Check if all required fields are provided
    if (!payerId || !amount || !currency || !paymentMethod) {
      res.status(400);
      throw new Error('Please add all fields');
    }
  
    // Check if the trainee exists
    const traineeExists = await Trainee.findById(payerId);
    if (!traineeExists) {
      res.status(400);
      throw new Error('Trainee not found');
    }
  
    // Create the payment
    const payment = await Payment.create({
      payerId,
      amount,
      currency,
      paymentMethod,
      status
    });
  
    res.status(201).json(payment);
  });


  const updatePayment = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { payerId, amount, currency, paymentMethod, status } = req.body;
  
    // Check if all required fields are provided
    if (!id) {
      res.status(400);
      throw new Error('Payment ID is required');
    }
  
    const payment = await Payment.findById(id);
  
    if (!payment) {
      res.status(404);
      throw new Error('Payment not found');
    }
  
    // Update the payment
    payment.payerId = payerId || payment.payerId;
    payment.amount = amount || payment.amount;
    payment.currency = currency || payment.currency;
    payment.paymentMethod = paymentMethod || payment.paymentMethod;
    payment.status = status || payment.status;
   
  
    const updatedPayment = await payment.save();
  
    res.status(200).json(updatedPayment);
  });

  const deletePayment = asyncHandler(async (req, res) => {
    console.log('Delete Payment Request Body:', req.body);
  
    const { id } = req.body;
  
    // Check if the payment ID is provided
    if (!id) {
      res.status(400);
      console.log('Error: Payment ID is required');
      throw new Error('Payment ID is required');
    }
    
    const payment = await Payment.findByIdAndDelete(id);
    console.log('Payment deleted:', payment);
    res.status(200).json({message:"done"});
  
});
  

const getPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json(payments);
});

const getPaymentsByPayerId = async (req, res) => {
  try {
    const  payerId  = req.params.id;
    console.log('Requested payerId:', payerId);

    const payments = await Payment.find( {payerId} );
    console.log('Found payments:', payments);

    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPayment,
  updatePayment,
  deletePayment,
  getPayments,
  getPaymentsByPayerId
};

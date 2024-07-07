const express = require('express');
const router = express.Router();
const { addPayment, updatePayment, deletePayment, getPayments ,getPaymentsByPayerId} = require('../controllers/paymentController');
const { protect, superAdmin } = require('../middleware/superAdminsAuth');

// Add a new payment
router.post('/', protect, superAdmin, addPayment);

// Update a payment
router.post('/update/:id', protect, superAdmin, updatePayment);

// Delete a payment
router.post('/delete', protect, superAdmin, deletePayment);

// Get all payments
router.get('/', protect, superAdmin, getPayments);

router.get('/:id', protect, superAdmin,getPaymentsByPayerId);

module.exports = router;

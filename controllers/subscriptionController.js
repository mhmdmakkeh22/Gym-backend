const asyncHandler = require("express-async-handler");
const Subscription = require("../models/subscriptionModels");


const getsubscription = asyncHandler(async (req, res, next) => {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
});

const getIndividualsubscription = asyncHandler(async (req, res, next) => {
    const subscriptionInd = await Subscription.findById(req.params.id);
    if (!subscriptionInd) {
        res.status(400);
        throw new Error("Doesn't exist");
    }

    res.send(subscriptionInd);
});

const postsubscriptionInd = asyncHandler(async (req, res, next) => {
    const { subscriptionname, description, price, duration } = req.body;
    if (!subscriptionname || !description || !price || !duration) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const subscription = await Subscription.create({
        subscriptionname,
        description,
        price,
        duration,
    })
    res.status(201).json(subscription);
});

const deletesubscription = asyncHandler(async (req, res, next) => {
    const subscriptionInd = await Subscription.findById(req.params.id);
    if (!subscriptionInd) {
        res.status(400);
        throw new Error("Doesn't exist");
    }
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'subscription deleted',  subscriptionInd });
});

const updatesubscription = asyncHandler(async (req, res) => {
    const subscriptionInd = await Subscription.findById(req.params.id);
    if (!subscriptionInd) {
        res.status(400);
        throw new Error("Doesn't exist");
    }
    const updatedsubscription = await Subscription.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedsubscription);
});

module.exports = {
  getsubscription,
  getIndividualsubscription,
  postsubscriptionInd,
  deletesubscription,
 updatesubscription,

};
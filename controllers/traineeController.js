const asyncHandler = require("express-async-handler");
const Trainee = require("../models/traineeModel");

const getTrainee = asyncHandler(async (req, res) => {
  try {
    console.log("Request Admin:", req.admin); // Log admin information
    if (!req.admin || !req.admin.id) {
      res.status(400).json({ message: "Admin ID is missing" });
      return;
    }

    const trainees = await Trainee.find({ admin_id: req.admin.id });
    console.log("Trainees found:", trainees); // Log retrieved trainees

    res.status(200).json(trainees);
  } catch (error) {
    console.error("Error fetching trainees:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const getIndividualTrainee = asyncHandler(async (req, res) => {
  const traineeInd = await Trainee.findById(req.params.id);
  if (!traineeInd) {
    res.status(400);
    throw new Error("Doesn't exist");
  }
  
  res.send(traineeInd);
});

const postTrainee = asyncHandler(async (req, res) => {
  const { name, email, phone, subscriptionType } = req.body;
  if (!name || !email || !phone || !subscriptionType) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const trainee = await Trainee.create({
    name,
    email,
    phone,
    subscriptionType,
    admin_id: req.admin.id
  });
  res.json(trainee);
});

const deleteTrainee = asyncHandler(async (req, res) => {
  const traineeInd = await Trainee.findById(req.params.id);
  if (!traineeInd) {
    res.status(400);
    throw new Error("Doesn't exist");
  }
  if (traineeInd.admin_id.toString() !== req.admin.id) {
    res.status(400);
    throw new Error("Doesn't exist");
  }
  await Trainee.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Trainee deleted', traineeInd });
});

const updateTrainee = asyncHandler(async (req, res) => {
  const traineeInd = await Trainee.findById(req.params.id);
  if (!traineeInd) {
    res.status(400);
    throw new Error("Doesn't exist");
  }
  if (traineeInd.admin_id.toString() !== req.admin.id) {
    res.status(401);
    throw new Error("Doesn't exist");
  }
  const updatedTrainee = await Trainee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTrainee);
});



const getTraineeBySubscription = asyncHandler(async (req, res) => {
  try {
    const { subscriptionType } = req.params;
   console.log(subscriptionType);
    if (!subscriptionType) {
      return res.status(400).json({ message: 'Subscription type is required' });
    }

    const trainees = await Trainee.find({
      admin_id: req.admin.id,
      subscriptionType: subscriptionType,
    });

    res.status(200).json(trainees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = {
  getTrainee,
  getIndividualTrainee,
  postTrainee,
  deleteTrainee,
  updateTrainee,
  getTraineeBySubscription,
};

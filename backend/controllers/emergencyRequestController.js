import asyncHandler from "express-async-handler";
import EmergencyRequest from "../models/emergencyRequestModel.js";

// @desc    Create a new emergency request
// @route   POST /api/emergency-requests
// @access  Public
const createEmergencyRequest = asyncHandler(async (req, res) => {
  const { name, age, contactnumber, symptoms, urgencylevel, location, hospital,additional } = req.body;

  const emergencyRequest = new EmergencyRequest({
    name,
    age,
    contactnumber,
    symptoms,
    urgencylevel,
    location,
    hospital,
    additional,
  });

  const createdRequest = await emergencyRequest.save();
  res.status(201).json(createdRequest);
});

// @desc    Get all emergency requests
// @route   GET /api/emergency-requests
// @access  Admin
const getEmergencyRequests = asyncHandler(async (req, res) => {
  const emergencyRequests = await EmergencyRequest.find({});
  res.json(emergencyRequests);
});

// @desc    Get emergency request by ID
// @route   GET /api/emergency-requests/:id
// @access  Admin
const getEmergencyRequestById = asyncHandler(async (req, res) => {
  const emergencyRequest = await EmergencyRequest.findById(req.params.id);

  if (emergencyRequest) {
    res.json(emergencyRequest);
  } else {
    res.status(404);
    throw new Error("Emergency Request not found");
  }
});

// @desc    Update emergency request
// @route   PUT /api/emergency-requests/:id
// @access  Public
const updateEmergencyRequest = asyncHandler(async (req, res) => {
  const { name, age, contactnumber, symptoms, urgencylevel, location,hospital, additional } = req.body;

  const emergencyRequest = await EmergencyRequest.findById(req.params.id);

  if (emergencyRequest) {
    emergencyRequest.name = name || emergencyRequest.name;
    emergencyRequest.age = age || emergencyRequest.age;
    emergencyRequest.contactnumber = contactnumber || emergencyRequest.contactnumber;
    emergencyRequest.symptoms = symptoms || emergencyRequest.symptoms;
    emergencyRequest.urgencylevel = urgencylevel || emergencyRequest.urgencylevel;
    emergencyRequest.location = location || emergencyRequest.location;
    emergencyRequest.hospital = hospital || emergencyRequest.hospital;
    emergencyRequest.additional = additional || emergencyRequest.additional;

    const updatedRequest = await emergencyRequest.save();
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error("Emergency Request not found");
  }
});

// @desc    Delete emergency request
// @route   DELETE /api/emergency-requests/:id
// @access  Admin
const deleteEmergencyRequest = asyncHandler(async (req, res) => {
    const emergencyRequest = await EmergencyRequest.findById(req.params.id);
  
    if (emergencyRequest) {
      // Replace .remove() with .deleteOne() or .findByIdAndDelete()
      await emergencyRequest.deleteOne(); // Correct usage for deletion
      res.json({ message: 'Emergency request removed' });
    } else {
      res.status(404);
      throw new Error('Emergency request not found');
    }
  });

export {
  createEmergencyRequest,
  getEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyRequest,
  deleteEmergencyRequest,
};

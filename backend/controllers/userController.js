import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    let userDetails = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // If the user is a patient, include patient-specific details
    if (user.role === "Patient" && user.patientDetails) {
      userDetails = {
        ...userDetails,
        patientDetails: {
          dob: user.patientDetails.dob,
          phone: user.patientDetails.phone,
          emergencyContact: user.patientDetails.emergencyContact,
        },
      };
    }

    // If the user is in management, include management-specific details
    if (user.role === "Management" && user.managementDetails) {
      userDetails = {
        ...userDetails,
        managementDetails: {
          section: user.managementDetails.section,
          startDate: user.managementDetails.startDate,
          phone: user.managementDetails.phone,
          location: user.managementDetails.location,
        },
      };
    }

    res.json(userDetails);
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, patientDetails, managementDetails } =
    req.body;

  const userExists = await User.findOne({ email });

  // Validate user already exist
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Validate required fields
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate email format
  const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailAddress.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  // Validate password
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Validate patient details if role is patient
  if (role === "Patient") {
    if (
      !patientDetails ||
      !patientDetails.dob ||
      !patientDetails.phone ||
      !patientDetails.emergencyContact
    ) {
      res.status(400);
      throw new Error("Patient details are required");
    }

    // Validate date of birth (dob) - cannot be a future date
    const dob = new Date(patientDetails.dob);
    if (dob > new Date()) {
      res.status(400);
      throw new Error("Date of birth cannot be a future date");
    }
  }

  // Validate management details if role is management
  else if (role === "Management") {
    if (
      !managementDetails ||
      !managementDetails.section ||
      !managementDetails.startDate ||
      !managementDetails.phone ||
      !managementDetails.location
    ) {
      res.status(400);
      throw new Error("Management details are required");
    }

    // Validate start date - cannot be a future date
    const startDate = new Date(managementDetails.startDate);
    if (startDate > new Date()) {
      res.status(400);
      throw new Error("Start date cannot be a future date");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    patientDetails: role === "Patient" ? patientDetails : null,
    managementDetails: role === "Management" ? managementDetails : null,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      // Check if details are being fetched correctly
      patientDetails: user.role === "Patient" ? user.patientDetails : null,
      managementDetails:
        user.role === "Management" ? user.managementDetails : null,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // Log user role for debugging
    console.log("User role:", user.role);

    // Update patientDetails if the user is a patient
    if (user.role === "Patient") {
      user.patientDetails = {
        dob: req.body.patientDetails?.dob || user.patientDetails?.dob,
        phone: req.body.patientDetails?.phone || user.patientDetails?.phone,
        emergencyContact:
          req.body.patientDetails?.emergencyContact ||
          user.patientDetails?.emergencyContact,
      };
    }

    // Update managementDetails if the user is a management user
    if (user.role === "Management") {
      user.managementDetails = {
        section:
          req.body.managementDetails?.section ||
          user.managementDetails?.section,
        startDate:
          req.body.managementDetails?.startDate ||
          user.managementDetails?.startDate,
        phone:
          req.body.managementDetails?.phone || user.managementDetails?.phone,
        location:
          req.body.managementDetails?.location ||
          user.managementDetails?.location,
      };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      patientDetails:
        updatedUser.role === "Patient" ? updatedUser.patientDetails : null,
      managementDetails:
        updatedUser.role === "Management"
          ? updatedUser.managementDetails
          : null,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all patients
// @route   GET /api/users/patients
// @access  Private/Admin
// @desc    Get all patients
// @route   GET /api/patients
// @access  Private/Admin (if necessary)
const getPatients = asyncHandler(async (req, res) => {
  // Fetch only users with the role "Patient"
  const patients = await User.find({ role: 'Patient' });

  if (patients) {
    res.json(patients);
  } else {
    res.status(404);
    throw new Error('No patients found');
  }
});

// Admin side
const addNewUser = asyncHandler(async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const savedData = await userData.save();
    res.status(200).json({ msg: "User Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const getOneUserById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const updateUserDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const deleteUserDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getPatients,  // Export this new function
  addNewUser,
  getAllUsers,
  getOneUserById,
  updateUserDetails,
  deleteUserDetails,
};

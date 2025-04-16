// ambulanceController.js
import asyncHandler from 'express-async-handler';
import Ambulance from '../models/ambulanceModel.js';
import nodemailer from 'nodemailer';
const createAmbulance = asyncHandler(async (req, res) => {
  const {
    ambulancenumber,
    vehiclenumber,
    drivername,
    drivercontact,
    driveremail,
    ambulancetype,
    availability
  } = req.body;

  const ambulance = new Ambulance({
    ambulancenumber,
    vehiclenumber,
    drivername,
    drivercontact,
    driveremail,
    ambulancetype,
    availability
  });

  const createdAmbulance = await ambulance.save();
  res.status(201).json(createdAmbulance);
});


const getAmbulances = asyncHandler(async (req, res) => {
  const ambulances = await Ambulance.find({});
  res.json(ambulances);
});


const getAmbulanceById = asyncHandler(async (req, res) => {
  const ambulance = await Ambulance.findById(req.params.id);

  if (ambulance) {
    res.json(ambulance);
  } else {
    res.status(404);
    throw new Error('Ambulance not found');
  }
});


const updateAmbulance = asyncHandler(async (req, res) => {
  const {
    ambulancenumber,
    vehiclenumber,
    drivername,
    drivercontact,
    driveremail,
    ambulancetype,
    availability
  } = req.body;

  const ambulance = await Ambulance.findById(req.params.id);

  if (ambulance) {
    ambulance.ambulancenumber = ambulancenumber || ambulance.ambulancenumber;
    ambulance.vehiclenumber = vehiclenumber || ambulance.vehiclenumber;
    ambulance.drivername = drivername || ambulance.drivername;
    ambulance.drivercontact = drivercontact || ambulance.drivercontact;
    ambulance.driveremail = driveremail || ambulance.driveremail;
    ambulance.ambulancetype = ambulancetype || ambulance.ambulancetype;
    ambulance.availability = availability || ambulance.availability;

    const updatedAmbulance = await ambulance.save();
    res.json(updatedAmbulance);
  } else {
    res.status(404);
    throw new Error('Ambulance not found');
  }
});


const deleteAmbulance = asyncHandler(async (req, res) => {
    const ambulance = await Ambulance.findById(req.params.id);
  
    if (ambulance) {
      // Replace .remove() with .deleteOne() or .findByIdAndDelete()
      await ambulance.deleteOne(); // Correct usage for deletion
      res.json({ message: 'Ambulance removed' });
    } else {
      res.status(404);
      throw new Error('Ambulance not found');
    }
  });
  


  // Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services or SMTP settings
  auth: {
    user: 'duviduk@gmail.com',  // Add your email credentials in .env
    pass: 'dbjp rfke judp kxxf'
  },
});

// Function to send email
const sendEmail = asyncHandler(async (req, res) => {
  const { driveremail, emailBody } = req.body;

  const mailOptions = {
    from: 'duviduk@gmail.com',
    to: driveremail,
    subject: 'Ambulance Assignment: You have a trip!',
    text: emailBody || 'You have been assigned to a new emergency trip. Please be ready to respond quickly.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      return res.status(200).json({ message: 'Email sent successfully!' });
    }
  });
});



const updateAmbulanceAvailability = asyncHandler(async (req, res) => {
  const { availability } = req.body;

  const ambulance = await Ambulance.findById(req.params.id);

  if (ambulance) {
    ambulance.availability = availability; // Update availability
    const updatedAmbulance = await ambulance.save();
    res.json(updatedAmbulance);
  } else {
    res.status(404);
    throw new Error('Ambulance not found');
  }
});




export {
  createAmbulance,
  getAmbulances,
  getAmbulanceById,
  updateAmbulance,
  deleteAmbulance,
  sendEmail,
  updateAmbulanceAvailability
};

// controllers/appointmentController.js
import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import DeletedAppointment from '../models/deletedAppointmentModel.js';
import { geocodeAddress } from "../utils/geocodeAddress.js"; // Import the DeletedAppointment model

// Create appointment
// export const createAppointment = async (req, res) => {
//   try {
//     console.log("Received appointment data:", req.body);
//     const appointmentData = new Appointment(req.body);
//     await appointmentData.save();
//     res.status(201).json({ msg: "Appointment created successfully" });
//   } 
//   catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const createAppointment = async (req, res) => {
  try {
    const { address } = req.body;

    // Ensure address is provided
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    // Convert address to coordinates
    let location;
    try {
      location = await geocodeAddress(address);
    } catch (geocodeError) {
      console.error("Geocode error:", geocodeError);
      return res.status(500).json({ error: "Failed to geocode address" });
    }

    const appointmentData = new Appointment({
      ...req.body,
      location: {
        type: "Point",
        coordinates: [location.lon, location.lat], // ✅ GeoJSON format
      },
    });
    

    await appointmentData.save();

    res.status(201).json({ msg: "Appointment created successfully" });
  } catch (error) {
    console.error("Appointment creation error:", error);
    res.status(500).json({ error: error.message });
  }
};



// Get all appointments for patient
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all appointments for Admin
export const getAllAppointmentsAdmin = async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //get one appointment update -admin
  export const appointmentgetone = async(req, res) => {
    try{
        const id = req.params.id;
        const appointmentExist = await Appointment.findById(id);

        if(!appointmentExist){
            return res.status(404).json({msg: "Doctor data not found"});
        }

        res.status(200).json(appointmentExist);
    }catch(error){
        res.status(500).json({error: error});
    }
}




export const updateAppointment = async (req, res) => {
    const { date, starttime } = req.body;
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        // { date, starttime },
        req.body,
        { new: true }
      );
  
      if (!updatedAppointment) {
        return res.status(404).json({ msg: "Appointment not found" });
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
// Fetch all deleted appointments
export const getDeletedAppointments = async (req, res) => {
  try {
    const deletedAppointments = await DeletedAppointment.find();
    res.status(200).json(deletedAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all deleted appointments
export const getDeletedAppointmentsPatient = async (req, res) => {
  try {
    const deletedAppointments = await DeletedAppointment.find();
    res.status(200).json(deletedAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent appointments for heatmap (last 3 days)
export const getRecentAppointmentsForHeatmap = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // 1. Find all recent appointments
    const appointments = await Appointment.find({
      createdAt: { $gte: threeDaysAgo },
    });

    // 2. Group by area + symptom sets
    const clusterMap = new Map();

    appointments.forEach(app => {
      const area = app.address.trim().toLowerCase();
      const symptomsKey = app.symptoms.sort().join(',').toLowerCase();
      const clusterKey = `${area}::${symptomsKey}`;

      if (!clusterMap.has(clusterKey)) {
        clusterMap.set(clusterKey, []);
      }
      clusterMap.get(clusterKey).push(app);
    });

    // 3. Only return clusters with 2 or more people
    const features = [];
    for (const cluster of clusterMap.values()) {
      if (cluster.length >= 3) {
        cluster.forEach(app => {
          features.push({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: app.location.coordinates,
            },
          });
        });
      }
    }

    res.json({
      type: 'FeatureCollection',
      features,
    });
  } catch (err) {
    console.error("Heatmap fetch error:", err);
    res.status(500).json({ error: err.message });
  }
};




// Delete an appointment and move it to DeletedAppointment
export const appointmentdelete = async (req, res) => {
  try {
    const id = req.params.id;
    const appointmentExist = await Appointment.findById(id);

    if (!appointmentExist) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Create a new entry in the DeletedAppointment collection
    const deletedAppointment = new DeletedAppointment({
      name: appointmentExist.name,
      age: appointmentExist.age,
      symptoms: appointmentExist.symptoms,
      gender: appointmentExist.gender,
      address: appointmentExist.address,
      hospitalName: appointmentExist.hospitalName,
      doctorName: appointmentExist.doctorName,
      date: appointmentExist.date,
      starttime: appointmentExist.starttime,
      status: appointmentExist.status,
    });
    await deletedAppointment.save(); // Save the deleted appointment data

    // Delete the original appointment from the Appointment collection
    await Appointment.findByIdAndDelete(id);

    res.status(200).json({ msg: "Appointment moved to deleted appointments successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get doctors by specialization
export const getDoctorsBySpecialization = async (req, res) => {
  const { specialization } = req.params;
  try {
    const doctors = await Doctor.find({ specialization });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get doctor by name to retrieve date and start time
export const getDoctorByName = async (req, res) => {
    const { doctorname } = req.params;
    try {
      const doctor = await Doctor.findOne({ doctorname });
      if (!doctor) {
        return res.status(404).json({ msg: "Doctor not found" });
      }
      res.status(200).json(doctor); // This returns the date and starttime of the doctor
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



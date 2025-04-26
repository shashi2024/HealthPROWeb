import Appointment from "../models/appointmentModel.js";

// Utility function to determine age group
const getAgeGroup = (age) => {
  if (age < 18) return "Under 18";
  if (age < 40) return "18-39";
  if (age < 60) return "40-59";
  return "60+";
};

// GET /api/alerts/generateAlerts
// const generateAlert = async (req, res) => {
//   try {
//     const appointments = await Appointment.find();

//     const alerts = appointments.map((appointment) => ({
//         _id: appointment._id,
//       patientName: appointment.name,
//       ageGroup: getAgeGroup(appointment.age),
//       symptoms: appointment.symptoms,
//       address: appointment.address,
//       time: appointment.date,
//       doctor: appointment.doctorName,
//       hospital: appointment.hospitalName,
//     }));

//     res.json(alerts);
//   } catch (error) {
//     console.error("Error generating alert:", error.message);
//     res.status(500).json({ message: "Server Error: Unable to generate alerts" });
//   }
// };

// controllers/alertController.js
const generateAlert = async (req, res) => {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const appointments = await Appointment.find({
      createdAt: { $gte: threeDaysAgo },
    });

    const clusterMap = new Map();

    appointments.forEach((app) => {
      const area = app.address.trim().toLowerCase();
      const symptomsKey = app.symptoms.sort().join(",").toLowerCase();
      const clusterKey = `${area}::${symptomsKey}`;

      if (!clusterMap.has(clusterKey)) {
        clusterMap.set(clusterKey, []);
      }
      clusterMap.get(clusterKey).push(app);
    });

    const alerts = [];

    for (const [key, cluster] of clusterMap.entries()) {
      if (cluster.length >= 3) {
        cluster.forEach((app) => {
          alerts.push({
            _id: app._id,
            patientName: app.name || "Anonymous",
            ageGroup: getAgeGroup(app.age) || "Unknown",
            symptoms: app.symptoms,
            hospital: app.hospitalName || "Not specified",
            location: app.address,
            coordinates: app.location.coordinates,
            timestamp: app.createdAt,
            gender: app.gender || "Not specified",
          });
        });
      }
    }

    res.json(alerts);
  } catch (err) {
    console.error("Error generating alerts:", err);
    res.status(500).json({ error: "Failed to generate alerts" });
  }
};


// For demonstration purposes — optional
const getAllAlerts = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching alerts:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Placeholder if needed
const getAlertById = async (req, res) => {
    try {
      // Retrieve the alert ID from the request parameters
      const alertId = req.params.id;
      
      // Find the appointment by the alert ID
      const appointment = await Appointment.findById(alertId);
      
      // If no appointment is found, return a 404 error
      if (!appointment) {
        return res.status(404).json({ message: "Alert not found" });
      }
  
      // Generate alert data (similar to generateAlert)
      const alert = {
        _id: appointment._id,
        patientName: appointment.name,
        gender: appointment.gender,
        ageGroup: getAgeGroup(appointment.age),
        symptoms: appointment.symptoms,
        address: appointment.address,
        time: appointment.date,
        doctor: appointment.doctorName,
        hospital: appointment.hospitalName,
        contactNo: appointment.contactNumber,
      };
  
      // Return the alert data as JSON
      res.json(alert);
    } catch (error) {
      console.error("Error fetching alert:", error.message);
      res.status(500).json({ message: "Server Error: Unable to fetch alert" });
    }
  };

export { generateAlert, getAllAlerts, getAlertById };



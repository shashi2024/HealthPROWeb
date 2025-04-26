import Appointment from "../models/appointmentModel.js";
import Alert from "../models/alertModel.js";

// Utility function to determine age group
const getAgeGroup = (age) => {
  if (age < 18) return "Under 18";
  if (age < 40) return "18-39";
  if (age < 60) return "40-59";
  return "60+";
};

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
            contactNumber: app.contactNumber || "Not specified",
            gender: app.gender || "Not specified",
          });
        });
      }
    }

    for (const [key, cluster] of clusterMap.entries()) {
      if (cluster.length >= 3) {
        const representative = cluster[0]; // Take first appointment just for basic info
    
        const newAlert = new Alert({
          location: representative.address,
          symptoms: representative.symptoms,
          status: "Active",
          dateTime: new Date(), // or representative.createdAt
        });
    
        await newAlert.save();
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
        contactNumber: appointment.contactNumber,
      };
  
      // Return the alert data as JSON
      res.json(alert);
    } catch (error) {
      console.error("Error fetching alert:", error.message);
      res.status(500).json({ message: "Server Error: Unable to fetch alert" });
    }
  };

  // Utility function to generate and save alerts based on appointments
const generateAndSaveAlerts = async (req, res) => {
  try {
    // Set the threshold for looking back 3 days
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    // Fetch appointments from the last 3 days
    const appointments = await Appointment.find({
      createdAt: { $gte: threeDaysAgo },
    });

    const clusterMap = new Map();

    // Group appointments by area and symptoms
    appointments.forEach((app) => {
      const area = app.address.trim().toLowerCase(); // Area as a string
      const symptomsKey = app.symptoms.sort().join(",").toLowerCase(); // Sort symptoms for consistency
      const clusterKey = `${area}::${symptomsKey}`; // Cluster key based on area + symptoms

      if (!clusterMap.has(clusterKey)) {
        clusterMap.set(clusterKey, []); // Initialize the cluster if it doesn't exist
      }
      clusterMap.get(clusterKey).push(app); // Add appointment to the cluster
    });

    // Iterate through each cluster
    for (const [key, cluster] of clusterMap.entries()) {
      if (cluster.length >= 3) { // Only consider clusters with 3 or more appointments
        const firstAppointment = cluster[0]; // Use the first appointment's data for the alert

        // Create a new alert with the cluster's data
        const newAlert = new Alert({
          location: firstAppointment.address, // Use the location from the first appointment
          symptoms: firstAppointment.symptoms, // Use the symptoms from the first appointment
          status: "Active", // Default status for the alert
          dateTime: new Date(), // Current date and time for when the alert was generated
          coordinates: firstAppointment.location.coordinates, // Coordinates from the first appointment
        });

        // Save the generated alert into the Alert collection
        await newAlert.save();
      }
    }

    // Return a success response
    res.status(200).json({ message: "Alerts generated and saved successfully." });

  } catch (error) {
    // Log any errors and return a server error response
    console.error("Error generating and saving alerts:", error);
    res.status(500).json({ message: "Server error" });
  }
};
  

export { generateAlert, getAllAlerts, getAlertById, generateAndSaveAlerts};



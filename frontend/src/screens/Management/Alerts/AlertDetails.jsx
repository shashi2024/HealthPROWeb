import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AlertDetails = () => {
  const [alert, setAlerts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`/api/alerts/${id}`);
        setAlerts(response.data);
      } catch (error) {
        console.error("Error fetching pandemic alerts:", error);
      }
    };

    fetchAlerts();
  }, [id]);

  if (!alert) return <div>Loading alert details...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🚨 Alert Details</h2>
      <p><strong>Patient Name:</strong> {alert.patientName}</p>
      <p><strong>Age Group:</strong> {alert.ageGroup}</p>
      <p><strong>Symptoms:</strong> {alert.symptoms?.join(", ") || "N/A"}</p>
      <p><strong>Hospital:</strong> {alert.hospital}</p>
      <p><strong>Address:</strong> {alert.address}</p>
      <p><strong>Time:</strong> {alert.time}</p>
    </div>
  );
};

export default AlertDetails;

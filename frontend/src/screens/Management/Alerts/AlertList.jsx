import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../styles/AlertList.css";
import { FaBookmark } from "react-icons/fa";
import AdminDashboardSideNavbar from "../../../components/AdminDashboardSideNavbar";
import { Col } from "react-bootstrap";
import PandemicAlertPopup from "./PandemicAlertPopup"; // adjust path if different

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [completedAlerts, setCompletedAlerts] = useState({});
  const [importantAlerts, setImportantAlerts] = useState({});
  const navigate = useNavigate();
  const [pandemicDetected, setPandemicDetected] = useState(false);

  useEffect(() => {
    axios
      .get("/api/alerts/generate")
      .catch((err) => console.error(err))
      .then((res) => {
        setAlerts(res.data);

        // Check if any alert contains "pandemic" in symptoms
        const foundPandemic = res.data.some((alert) =>
          alert.symptoms.some((symptom) =>
            symptom.toLowerCase().includes("pandemic")
          )
        );

        if (foundPandemic) {
          setPandemicDetected(true);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Group alerts by "location (symptoms)"
  const groupedAlerts = alerts.reduce((acc, alert) => {
    const key = `${alert.location} (${alert.symptoms.join(", ")})`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(alert);
    return acc;
  }, {});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Math.floor((Date.now() - new Date(timestamp)) / 1000); // seconds
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
    return new Date(timestamp).toLocaleString();
  };

  const handleMarkCompleted = (id) => {
    setCompletedAlerts((prev) => ({ ...prev, [id]: true }));
  };

  const handleMarkImportant1 = (id) => {
    setImportantAlerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMarkImportant2 = (id) => {
    setImportantAlerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleImportant = (id) => {
    setImportantAlerts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteGroup = (key) => {
    const currentTime = Date.now();

    // Check if ALL alerts in that group are older than 1 hour
    const alertsInGroup = alerts.filter((alert) => {
      const groupKey = `${alert.location} (${alert.symptoms.join(", ")})`;
      return groupKey === key;
    });

    const canDelete = alertsInGroup.every((alert) => {
      const alertTime = new Date(alert.timestamp).getTime();
      return currentTime - alertTime >= 3600 * 1000; // 1 hour = 3600 sec * 1000 ms
    });

    if (canDelete) {
      const updatedAlerts = alerts.filter((alert) => {
        const groupKey = `${alert.location} (${alert.symptoms.join(", ")})`;
        return groupKey !== key;
      });
      setAlerts(updatedAlerts);
    } else {
      alert("You can only delete alerts that are older than 1 hour.");
    }
  };

  return (
    <>
      <Col md={3}>
        <AdminDashboardSideNavbar /> {/* Side navbar component */}
      </Col>
      <PandemicAlertPopup
        show={pandemicDetected}
        onClose={() => setPandemicDetected(false)}
      />

      <div className="alert-list">
        {Object.entries(groupedAlerts).map(([key, group]) => {
          const firstAlert = group[0];
          return (
            <div key={key} className="alert-section">
              <div className="alert-header" onClick={() => toggleSection(key)}>
                <button
                  className={`icon-btn ${
                    importantAlerts[firstAlert._id] ? "important" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkImportant1(firstAlert._id);
                  }}
                >
                  ♥
                </button>
                <button
                  className={`icon-btn ${
                    importantAlerts[firstAlert._id] ? "important" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkImportant2(firstAlert._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 2v13.5l6-3.5 6 3.5V2z" />
                  </svg>
                </button>

                <span className="location">{firstAlert.location}</span>
                <span className="symptoms">
                  ({firstAlert.symptoms.join(", ")})
                </span>
                <span className="time">
                  {formatTimeAgo(firstAlert.timestamp)}
                </span>
                <span className="dropdown">
                  {openSections[key] ? "▲" : "▼"}
                </span>
              </div>

              {openSections[key] && (
                <div className="alert-details">
                  <table>
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Age Group</th>
                        <th>Gender</th>
                        <th>Hospital</th>
                        <th>Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.map((alert) => (
                        <tr key={alert._id}>
                          <td>{alert.patientName}</td>
                          <td>{alert.ageGroup}</td>
                          <td>{alert.gender}</td>
                          <td>{alert.hospital}</td>
                          <td>{alert.contactNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="view-details">
                    <button
                      onClick={() => handleDeleteGroup(key)}
                      className="delete-btn"
                    >
                      Delete Alerts
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AlertList;
